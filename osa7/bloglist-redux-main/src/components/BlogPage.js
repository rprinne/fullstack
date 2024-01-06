import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, commentBlog } from "../slices/blogsSlice.js";

const BlogPage = () => {
  const [newComment, setNewComment] = useState("");
  const id = useParams().id
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users)
  const blog = blogs.find(b => b.id === id)
  const user = users.find(u => u.id === blog.user)

  const handleSubmitNewComment = event => {
    event.preventDefault();
    dispatch(commentBlog(blog, newComment))
    setNewComment("")
  }

  if (!blog) { return <p>blog not found</p> }
  return (
    <div>
    <h2>{`${blog.title} by ${blog.author}`}</h2>
    <span>{blog.url}</span>
    <br />
    <span>likes: {blog.likes}</span>{" "}
    <button name={"like-button"} onClick={() => dispatch(likeBlog(blog))}>
      like
    </button>
    <br />
    <span>{`added by ${user.name}`}</span>
    <h3>comments</h3>
    <form onSubmit={handleSubmitNewComment}>
      <input
        type="text"
        value={newComment}
        id="newComment"
        onChange={({ target }) => setNewComment(target.value)}
      />
      <button
        type="submit"
        id="submitNewComment">
        add comment
      </button>
    </form>
    {(blog.comments && blog.comments.length > 0)
      ? blog.comments.map(comment =>
        <li key={comment}>{comment}</li>)
      : <p>no comments</p>
    }
    </div>
  );
};

export default BlogPage;