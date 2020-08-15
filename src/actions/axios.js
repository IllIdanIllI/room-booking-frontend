import axios from "axios";

const axiosInstance =  axios.create({
  baseURL: "http://localhost:8090/",
  responseType: "json"
});

export default axiosInstance;