import axios from "axios";
const paths = ["/"];
const BASE_URL = "https://voosh-project.onrender.com/";
// const BASE_URL = "http://localhost:3123";

const httpClient = (endpoint = BASE_URL) => {
  const axiosInstance = axios.create({
    baseURL: endpoint,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        sessionStorage.clear();
        const { pathname } = window.location;
        if (!paths.includes(pathname)) {
          window.location.href = `/?redirect_url=${pathname}`;
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default httpClient;
