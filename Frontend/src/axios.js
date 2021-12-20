import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1337",
  //baseURL: "https://swadbackendapp.herokuapp.com",
});

instance.defaults.withCredentials = true;

export const mediastack = axios.create({
  baseURL:
    "http://api.mediastack.com/v1/news?access_key=ae0baf702b65b31c4bc116657c2d6a17&",
});

export default instance;
