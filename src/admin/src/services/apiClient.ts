import axios from "axios";
const BASE_URL = "https://localhost:25565";

export interface ErrorData {
  message: string;
}
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
