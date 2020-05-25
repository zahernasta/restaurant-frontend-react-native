import axios from 'axios';
import {ipAddress} from "../config";

export const getCuisineCategories = () => {
    return axios.get(ipAddress + "api/cuisine")
        .then(categories => {
            return categories.data;
        })
        .catch(error => {
            return error;
        })
}