import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://gitop-api.vercel.app/api/",

});

export default newRequest;