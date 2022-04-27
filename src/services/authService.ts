import { string } from "yup";
import axios from "../utils/config/axios.config";

/**
 * Method to register a new user
 * @param {String} email email to login user
 * @param {String} password password to login user
 * @returns 
 */
export const login = (email: string, password: string) => {
    // declare body to post
    let body = {
        email: email,
        password: password
    }

    // Send post request to login endpoint
    // "http://localhost:8000/api/"
    return axios.post("auth/login", body)

}

/**
 * Method to register a new user
 * @param {String} name name of user
 * @param {String} email email of user
 * @param {String} password password of user
 * @param {numebr} age age of user
 * @returns 
 */
export const register = (name: string, email: string, password: string, age: number) => {
    // declare body to post
    let body = {
        name: name,
        email: email,
        password: password,
        age: age
    }

    // Send post request to login endpoint
    // "http://localhost:8000/api/"
    return axios.post("auth/register", body)

}
