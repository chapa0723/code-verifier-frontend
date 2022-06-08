import { AxiosRequestConfig } from "axios";
import { access } from "fs";
import axios from "../utils/config/axios.config";

export const getAllKatas = (token:string, limit?:number, page?:number) => {
    //http://localhost:8000/api/katas?limit=1&page=1
    // Add headers with JWT in x-access-token
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            limit,
            page
        }    
    }
    
    return axios.get('/katas', options)
}

export const getKatasByID = (token: string, id: string) => {
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            id
        }    
    }
    return axios.get('/katas', options)
}