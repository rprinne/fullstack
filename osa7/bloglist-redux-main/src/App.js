import { useEffect } from "react";
import BlogList from "./components/BlogList";
import Toggleable from "./components/Toggleable";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

import { initializeBlogs } from "./slices/blogsSlice";
import { setUser, setUserNull } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const userRes = JSON.parse(loggedUserJSON);
      dispatch(setUser(userRes));
      blogService.setToken(userRes.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <div>
      <Notification />

      {!user.token && <LoginForm />}

      {user.token && (
        <p>
          {user.name} logged in{" "}
          <button id={"logout-button"} onClick={() => dispatch(setUserNull())}>
            logout
          </button>
        </p>
      )}

      {user.token && (
        <Toggleable buttonLabel="Add new">
          <NewBlogForm />
        </Toggleable>
      )}

      {user.token && <BlogList user={user.username} />}
    </div>
  );
};

export default App;
