import axios from "axios";
export const BASE_PARAM = "http://localhost:8080";

export default axios.create({
  baseURL: BASE_PARAM,
});
