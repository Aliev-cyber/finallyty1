import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const API_COMMENTS = "http://localhost:8000/comments";
const commentContext = createContext();

export function useCommentContext() {
  return useContext(commentContext);
}

const CommentContext = ({ children }) => {
  const [comments, setComments] = useState([]);

  async function getComments(key, value) {
    const { data } = await axios.get(API_COMMENTS, {
      params: {
        [key]: value,
      },
    });
    setComments(data);
  }
  async function deleteComment(id, key, value) {
    await axios.delete(`${API_COMMENTS}/${id}`);
    getComments(key, value);
  }
  async function addComment(obj, key, value) {
    await axios.post(API_COMMENTS, obj);
    getComments(key, value);
  }

  async function likeComment(commentId, username, key, value) {
    try {
      const commentResponse = await axios.get(`${API_COMMENTS}/${commentId}`);
      const comment = commentResponse.data;

      if (!comment.likes.includes(username)) {
        const updatedLikes = [...comment.likes, username];
        await axios.patch(`${API_COMMENTS}/${commentId}`, {
          likes: updatedLikes,
        });
        getComments(key, value);
        console.log("Comment liked successfully.");
      } else {
        const updatedLikes = comment.likes.filter(
          (userName) => userName !== username
        );
        await axios.patch(`${API_COMMENTS}/${commentId}`, {
          likes: updatedLikes,
        });
        console.log("Comment unliked successfully.");
        getComments(key, value);
      }
    } catch (error) {
      console.error("Error liking/unliking comment:", error);
    }
  }
  const value = {
    comments,
    getComments,
    addComment,
    deleteComment,
    likeComment,
  };

  return (
    <commentContext.Provider value={value}>{children}</commentContext.Provider>
  );
};

export default CommentContext;
