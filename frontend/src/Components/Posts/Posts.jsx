import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { Spinner, Alert } from "flowbite-react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts/getposts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data.posts);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen px-4">
          <Alert color="failure" className="max-w-md w-full">
            <span className="font-medium">Error!</span> {error}
          </Alert>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Latest Posts
        </h1>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-xl mt-10">
            No posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id || post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <Link to={`/post/${post.slug || post._id}`} className="block relative overflow-hidden group h-48">
                  <img
                    src={post.thumbnail || "https://via.placeholder.com/400x200"}
                    alt={post.postTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex-1">
                    <Link to={`/post/${post.slug || post._id}`}>
                      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 line-clamp-2">
                        {post.postTitle}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {post.postDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="font-medium text-gray-900 dark:text-gray-200">
                        By {post.auther || "Unknown"}
                      </span>
                      <span>
                        {post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : "Recently"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <Link
                        to={`/post/${post.slug || post._id}`}
                        className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold hover:underline"
                      >
                        Read Article
                      </Link>

                      <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                        <div className="flex items-center gap-1" title="Views">
                          <AiOutlineEye />
                          <span>{post.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Comments">
                          <AiOutlineComment />
                          <span>{post.comments || 0}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Likes">
                          <AiOutlineHeart />
                          <span>{post.Likes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Posts;
