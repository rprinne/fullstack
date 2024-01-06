import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const users = useSelector(state => state.users);
  return (
    <div>
      <h2>Users</h2>
      <table>
      <tr><th></th><th><b>blogs created</b></th></tr>
      {users.map(user =>
        <tr key={user.id}>
          <th><Link to={`/users/${user.id}`}> {user.name} </Link></th>
          <th> {user.blogs.length} </th>
        </tr>
      )}
      </table>
    </div>
  );
};

export default UsersPage;