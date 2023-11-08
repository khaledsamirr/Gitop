import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://gitop-api.onrender.com/api/",

});

export default newRequest;