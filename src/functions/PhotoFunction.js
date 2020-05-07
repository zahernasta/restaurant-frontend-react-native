import axios from 'axios';

export const getAllRestaurantPhotos = async (id) => {
    return axios.get(`http://192.168.1.100:8080//api/restaurants/${id}/photo/`)
        .then(photos => {
            return photos.data;
        })
        .catch(error => {
            return error;
        })
};