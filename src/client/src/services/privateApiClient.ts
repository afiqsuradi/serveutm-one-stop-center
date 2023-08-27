import axios from "axios";
import { BASE_PARAM } from "./apiClient";

export default axios.create({
  baseURL: BASE_PARAM,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  params: {
    baseUrl: window.location.origin,
  },
});
