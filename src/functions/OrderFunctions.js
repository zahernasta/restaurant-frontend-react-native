import axios from 'axios';
import {ipAddress} from "../config";

export const addOrder = (basketId, userId, restaurantId, order) => {
    return axios.post(ipAddress + `api/orders/${basketId}/users/${userId}/restaurants/${restaurantId}`, {

    })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error);
        })
}