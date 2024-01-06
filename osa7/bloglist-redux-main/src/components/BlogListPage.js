import BlogList from "./BlogList";
import Toggleable from "./Toggleable";
import NewBlogForm from "./NewBlogForm";
import { useSelector } from "react-redux";

const BlogListPage = () => {
  const user = useSelector(state => state.user)
  return (
    <div>
      {user.token &&
        <Toggleable buttonLabel="Add new">
          <NewBlogForm />
        </Toggleable>
      }
      <BlogList />
    </div>
  );
};

export default BlogListPage;