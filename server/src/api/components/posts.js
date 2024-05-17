const mongoose = require('mongoose');

const postsSchema = require('../models/posts');

const Post = mongoose.model('Post', postsSchema.schema);

/**
 * Responsible for registering a user to the system
 * @param {Object} req - Request object
 * @param {Object} req.body - Request body
 * @param {String} req.body.username - User name
 * @param {String} req.body.title - title of the show
 * @param {String} req.body.comment - Comment added by the user
 * @param {Object} res - Response object
 * @returns
 */
async function createPost(req, res) {
  const { username, title, comment } = req.body;

  try {
    const post = {
      username,
      title,
      post: comment,
    };
    await Post.insertMany(post);
    return res.json({ message: 'Post created!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).json({ message: error.writeErrors[0].errmsg });
    }
    return res.status(400).json({ message: error.message });
  }
}

/**
 * Responsible for fetching all the posts for a given title
 * @param {Object} req - Request object
 * @param {String} req.params.title - Title of the show
 * @param {Object} res - Response object
 * @returns
 */
async function getCommentsByTitle(req, res) {
  try {
    const post = await Post.find({
      title: { $regex: req.params.title },
    }).sort({ createdAt: -1 }); // (Display the date in descending order)
    if (post.length > 0) {
      return res.json(post);
    }

    return res.json(post);
  } catch (error) {
    if (error && error.status && error.status !== 200) {
      return res.status(error.status).json(error.message);
    }
    return res.json(error);
  }
}

/**
 * Responsible for updating a given post
 * @param {Object} req - Request object
 * @param {Object} req.params - Request object params
 * @param {String} req.params.id - Movie's id
 * @param {Object} req.body - Request object body
 * @param {String} req.body.post - Edited post
 * @param {Object} res - Response object
 * @returns
 */
async function updateCommentById(req, res) {
  try {
    const filter = { _id: req.params.id };
    const updateDoc = {
      $set: {
        post: req.body.post,
      },
    };

    const post = await Post.updateOne(filter, updateDoc);
    if (post.modifiedCount === 1) {
      const postUpdated = await Post.find(filter);
      return res.json(postUpdated);
    }
    throw new Error('Could not update comment');
  } catch (error) {
    if (error && error.status && error.status !== 200) {
      return res.status(error.status).json(error.message);
    }
    return res.json(error);
  }
}

/**
 * Responsible for removing a given post
 * @param {Object} req - Request object
 * @param {String} req.params - Request params
 * @param {String} req.params.id - Id of the post
 * @param {Object} res - Response object
 * @returns
 */
async function deleteCommentById(req, res) {
  try {
    const filter = { _id: req.params.id };
    const post = await Post.deleteOne(filter);
    if (post.deletedCount === 1) {
      return res.json({ data: 'Successfully deleted one document.' });
    }
    return res.json({
      data: 'No documents matched the query. Deleted 0 documents.',
    });
  } catch (error) {
    if (error && error.status && error.status !== 200) {
      return res.status(error.status).json(error.message);
    }
    return res.json(error);
  }
}

module.exports = {
  createPost,
  getCommentsByTitle,
  updateCommentById,
  deleteCommentById,
};
