import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showNotification } from "./notificationSlice";

export const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    updateBlog: (state, action) => {
      const blogToUpdate = action.payload;
      const id = blogToUpdate.id;
      return state.map((blog) => (blog.id !== id ? blog : blogToUpdate));
    },
    remove: (state, action) => {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, remove } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
    dispatch(showNotification("blog created", "success"));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = await blogService.update(blog.id, blogToUpdate);
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`,
    );
    if (ok) {
      const removedBlog = await blogService.remove(blog.id);
      if (removedBlog.status === 204) {
        dispatch(remove(blog.id));
        dispatch(showNotification("blog removed", "success"));
      } else {
        dispatch(showNotification("unauthorized", "error"));
      }
    }
  };
};

export default blogsSlice.reducer;
