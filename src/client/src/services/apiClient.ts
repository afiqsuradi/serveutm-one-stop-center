import axios from "axios";
import BASE_URL from "../constants/environment";

export default axios.create({
  baseURL: BASE_URL,
});
