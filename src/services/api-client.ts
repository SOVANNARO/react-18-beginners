import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "86a18ab13e6846b49b71045a59de49e9",
  },
});
