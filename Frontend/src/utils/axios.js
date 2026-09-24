import axios from "axios";
import qs from "qs";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) =>
      qs.stringify(params, {
        arrayFormat: "repeat",
      }),
  },
});