import axios from "axios";  
import { loaderController } from "./components/Loader/loaderController";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

apiInstance.interceptors.request.use((config) => {
  loaderController.start();
  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    loaderController.stop();
    return response;
  },
  (error) => {
    loaderController.stop();
    return Promise.reject(error);
  }
);

export default apiInstance;
