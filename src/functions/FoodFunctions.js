import axios from 'axios';
import {ipAddress} from "../config";

export const getOneFood = async (id) => {
    return axios.get(ipAddress + `api/foods/${id}`)
        .then(food => {
            return food.data;
        })
        .catch(error => {
            return error;
        })
}