import { API_URL } from "../config/api";
import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'https://api.themindnow.com',
    timeout: 15000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  
export default axiosClient;