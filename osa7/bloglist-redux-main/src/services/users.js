import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const res = axios.get(baseUrl);
  return res.then((response) => response.data);
};

export default { getAll };
