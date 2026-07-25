import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:'https://dummyjson.com'
});

axiosInstance.interceptors.response.use(
    (response)=>{
        console.log("in interceptors ",response)
        return response;
    },
    (error)=>{
        console.log(error)
    }
);
