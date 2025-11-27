import React from "react";
import { useState } from "react";
import Header from "../../Components/Header";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


function CreatePost() {
  const [tags, setTags] = useState([]);
  const [imgFile, setImgFile] = useState(null);
  const [file, setFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(null);
  const [imgUploadError, setImgUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    postTitle: "",
    postDescription: "",
    tags: [],
    thumbnail: "",
    user_id: currentUser._id,
    auther: currentUser.username,
  });
  const [uploadBtn, setUploadBtn] = useState(false);


  const handleChange = (newTags) => {
    setTags(newTags);
  };
  const handleAddition = (tag) => {
    setFormData({
      ...formData,
      tags: [...formData.tags, tag.text], // Add new tag to tags array
    });
  };

  // Handles deleting a tag
  const handleDelete = (i) => {
    const newTags = formData.tags.filter((tag, index) => index !== i);
    setFormData({ ...formData, tags: newTags }); // Update the tags array
  };
  console.log(formData);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgUploadProgress(progress.toFixed(0));
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          setImgUploadError("Something went wrong. Please try again.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgFileUrl(downloadURL);
            setImgUploadProgress(null);
            setImgUploadError(null);
            setFormData({ ...formData, thumbnail: downloadURL });
            console.log(formData);

            console.log("File available at", downloadURL);
          });
        }
      );
    } catch (error) {
      setImgUploadError(error.message);
      setImgUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.message === false) {
        return setPublishError(data.error)
      }
      if (!res.ok) {
        return setPublishError(data.message)
      }
      if (res.ok) {
        return setPublishError(null)
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setPublishError("Something went wrong");
    }
  }
  return (
    <>
      <Header />
      <div className="w-full min-h-auto bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl bg-white dark:bg-slate-950 shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-3 sm:p-6 md:py-3 md:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
              Create New Post
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  // value={title}
                  onChange={(e) =>
                    setFormData({ ...formData, postTitle: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 text-gray-700 border border-slate-50 dark:bg-slate-950 dark:border-gray-900 dark:border-b-gray-300 dark:text-gray-50 border-b-gray-300 rounded-sm focus:outline-none focus:ring-0 text-base sm:text-md transition duration-150 ease-in-out"
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1"
                >
                  Tags
                </label>

                <TagsInput
                  className="dark:react-tagsinputForDark dark:react-tagsinput-inputForDark"
                  placeholder="Add new tag"
                  value={formData.tags}
                  onChange={(tags) => setFormData({ ...formData, tags })} // Update tags array directly
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                />
              </div>
              <div className="bg-stone-100 dark:bg-gray-900 flex justify-between items-center px-4 py-3">
                <input
                  type="file"
                  accept=".jpeg,.png,.jpg,.webp"
                  id="image"
                  name="image"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                  type="button"
                  onClick={handleUploadImage}
                  disabled={!file && imgUploadProgress === null}
                  className="border px-3 py-1 rounded-sm border-slate-950 bg-white dark:bg-slate-950 dark:border-white hover:bg-black hover:text-white dark:hover:text-gray-900 dark:hover:bg-white transition-all duration-100 font-medium"
                >
                  {imgUploadProgress ? (
                    <div className="h-16 w-16">
                      <CircularProgressbar
                        value={imgUploadProgress}
                        text={`${imgUploadProgress || 0}%`}
                      />
                    </div>
                  ) : (
                    "Upload Image"
                  )}
                </button>
              </div>
              {imgUploadError && (
                <p className="bg-rose-600 text-white px-3 py-2">
                  {imgUploadError}
                </p>
              )}
              {formData.image && (
                <img
                  src={formData.image}
                  className="w-full h-72 object-cover"
                  alt=""
                />
              )}
              {/* <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-50 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-3 py-2 text-gray-700 border-gray-300 dark:bg-slate-950 dark:border-gray-300  dark:text-gray-50  rounded-sm focus:outline-none focus:ring-0 text-base sm:text-lg transition duration-150 ease-in-out"
                  placeholder="Write your post content here"
                ></textarea>
              </div> */}
              <ReactQuill
                // id="content"
                // value={content}
                onChange={(value) =>
                  setFormData({ ...formData, postDescription: value })
                }
                placeholder="Write your post content here"
              />
              <div>
                <button
                  type="submit"
                  className="w-full shadow-md px-2 py-3 border rounded-lg bg-gray-900 text-white hover:bg-white hover:text-gray-900 transition-colors duration-200 text-base sm:text-lg font-medium"
                >
                  Create Post
                </button>
                {publishError && (
                  <p className="bg-rose-600 text-white px-3 py-2">
                    {publishError}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
