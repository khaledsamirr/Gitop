import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://gitop-api.vercel.app/api/",
  withCredentials: true,
});

export default newRequest;