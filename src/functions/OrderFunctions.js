import axios from 'axios';
import {ipAddress} from "../config";

export const createOneOrder = (userId, restaurantId, order) => {
    return axios.post(ipAddress + `api/orders/users/${userId}/restaurants/${restaurantId}`, {
        orderDate: order.orderDate,
        orderTime: order.orderTime,
        orderStatus: order.orderStatus,
        orderCancelled: order.orderCancelled,
        amount: order.amount
    })
        .then(data => {
            return data;
        })
        .catch(error => {
            return error;
        })
}

export const getOrdersByUserId = (userId) => {
    return axios.get(ipAddress + `api/orders/user/${userId}`)
        .then(items => {
            console.log(items.data);
            return items.data;
        })
        .catch(error => {
            console.log(error);
        })
}