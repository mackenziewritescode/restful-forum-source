import axios from "axios";

// POSTS
const postUrl = "https://restful-forum.herokuapp.com/posts";

export const fetchPosts = () => axios.get(postUrl);

export const createPost = (newPost) => axios.post(postUrl, newPost);

export const updatePost = (id, updatedPost) =>
  axios.patch(`${postUrl}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${postUrl}/${id}`);

// REPLIES
const replyUrl = "https://restful-forum.herokuapp.com/replies";

export const fetchReplies = () => axios.get(replyUrl);

export const createReply = (newReply) => axios.post(replyUrl, newReply);

export const updateReply = (id, updatedReply) =>
  axios.patch(`${replyUrl}/${id}`, updatedReply);

export const deleteReply = (id) => axios.delete(`${replyUrl}/${id}`);

export const deleteChildren = (parentId) =>
  axios.delete(`${replyUrl}/parent/${parentId}`);
