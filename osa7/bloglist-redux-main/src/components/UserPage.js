import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const id = useParams().id
  const users = useSelector(state => state.users);
  const user = users.find(u => u.id === id)
  if (!user) {return (<p>No user found</p>)}
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
      {user.blogs
        .map(blog => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </div>
  );
};

export default UserPage;