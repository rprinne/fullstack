import Blog from "./Blog.js";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../slices/blogsSlice.js";

const BlogList = () => {
  const dispatch = useDispatch();
  const byLikes = (x, y) => y.likes - x.likes;
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  if (blogs === undefined) {
    return null;
  }
  //console.log(blogs)
  return (
    <div>
      <h2>Blogs</h2>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          user={user.username}
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
