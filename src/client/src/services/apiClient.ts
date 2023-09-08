import axios from "axios";
export const BASE_PARAM = "https://localhost:8080";

export default axios.create({
  baseURL: BASE_PARAM,
});
