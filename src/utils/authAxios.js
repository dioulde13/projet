import axios from "axios";

const endpoint = `${process.env.REACT_APP_API_URL}/api`;
export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${localStorage.getItem("access")}`,
    Accept: "application/json",
  },
});
