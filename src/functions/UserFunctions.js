import axios from 'axios';
import { ipAddress } from "../config";

export const register = (user) => {
    return axios.post(ipAddress + "api/users", {
        username: user.username,
        email: user.email
    }).then(res => {
        if(res.data.message) {
            return res.data;
        }
        return res.data;
    })
        .catch(err => {
            console.log(err);
    });
};

export const findUserByUsername = (username) => {
    console.log(username);
    return axios.get(ipAddress + `api/users/name/${username}`)
        .then(user => {
            return user.data
        })
        .catch(error => {
            console.log(error);
        })
}

export const getUserFavorites = (userId) => {
    return axios.get(ipAddress + `api/users/${userId}/favorites`)
        .then(favorite => {
            return favorite.data;
        })
        .catch(error => {
            console.log(error);
        })
}

export const addFavorites = (userId, restaurantId) => {
    return axios.post(ipAddress + `api/users/${userId}/restaurants/${restaurantId}`)
        .then(data => {
            return data.data;
        })
        .catch(error => {
            console.log(error);
        })
}