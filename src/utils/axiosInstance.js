import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const get = async (path, options = {}) => {
  const response = await httpClient.get(path, options)
  return response.data
}

export default httpClient;