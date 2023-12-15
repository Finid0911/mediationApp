import { Axios, AxiosRequestConfig } from "axios";
import axiosClient from "./axiosClient";

export const authService = {
    login: async(data:Record<string, any>, config: AxiosRequestConfig) => {
        const url = `/login`;
        console.log(axiosClient);
        return await axiosClient.post(url, {...data}, {...config});
    }
}
