import { useEffect } from "react";
import BlogListPage from "./components/BlogListPage";
import UserPage from "./components/UserPage";
import UsersPage from "./components/UsersPage";
import BlogPage from "./components/BlogPage";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

import { initializeBlogs } from "./slices/blogsSlice";
import { initializeUsers } from "./slices/usersSlice";
import { setUser, setUserNull } from "./slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

const App = () => {
  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const padding = { padding: 5 }

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
    dispatch(initializeUsers());
  }, []);

  return (
    <div className="container">
      <Notification />
      <div className="NavigationMenu">
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.token
        ? <em>{user.name} logged in{" "}
            <button id={"logout-button"} onClick={() => dispatch(setUserNull())}>
              logout
            </button>
          </em>
        : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<BlogListPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
      </Routes>
    </div>
  );
};

export default App;
