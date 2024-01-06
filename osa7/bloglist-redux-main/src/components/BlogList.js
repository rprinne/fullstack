import Blog from "./Blog.js";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../slices/blogsSlice.js";

const BlogList = () => {
  const dispatch = useDispatch();
  const byLikes = (x, y) => y.likes - x.likes;
  const blogs = useSelector((state) => state.blogs);
  if (blogs === undefined) {
    return null;
  }
  return (
    <div>
      <h2>Blogs</h2>
      {[...blogs].sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => {
            dispatch(likeBlog(blog));
          }}
          handleRemove={() => {
            dispatch(removeBlog(blog));
          }}
        />
      ))}
    </div>
  );
};

export default BlogList;
