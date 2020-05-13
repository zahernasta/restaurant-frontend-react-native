import axios from 'axios';
import {ipAddress} from "../config";

export const getAllRestaurantPhotos = async (id) => {
    return axios.get(ipAddress + `api/restaurants/${id}/photo/`)
        .then(photos => {
            return photos.data;
        })
        .catch(error => {
            return error;
        })
};