import Posts from "../models/post-model.js";

export const createPost = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: "You are not Admin" });
  }
  if (!req.body.postTitle || !req.body.postDescription) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const slug = req.body.postTitle
    .toLowerCase()
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new Posts({
    ...req.body,
    slug
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      success: true,
      post: savedPost,
    });
    console.log(savedPost);

  } catch (error) {
    // next(error);
    console.log(error);

  }
};

export const getPosts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Posts.find({
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
    }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

    res.status(200).json({
      posts,
      totalPosts: posts.length, // Note: This should ideally be a separate count query for pagination
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




