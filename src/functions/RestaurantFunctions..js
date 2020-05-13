import axios from 'axios';
import {ipAddress} from "../config";

export const getAllRestaurants = () => {
    return axios.get( ipAddress + "api/restaurants")
    .then(restaurants => {
        console.log(ipAddress);
        return restaurants.data;
    })
        .catch(error => {
            return error;
    });
};

export const getOneRestaurant = (id) => {
    return axios.get(ipAddress + `api/restaurants/${id}`)
        .then(restaurant => {
            return restaurant.data;
        })
        .catch(error => {
            return error;
        })
};

export const getMenu = (id) => {
    return axios.get(ipAddress + `api/restaurants/${id}/menu`)
        .then(foods => {
            return foods.data;
        })
        .catch(error => {
            return error;
        })
}

