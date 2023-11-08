import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://gitop-api.onrender.com/api/",
  withCredentials:true,
});

export default newRequest;