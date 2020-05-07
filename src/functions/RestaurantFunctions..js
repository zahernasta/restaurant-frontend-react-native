import axios from 'axios';

export const getAllRestaurants = () => {
    return axios.get("http://192.168.1.100:8080//api/restaurants")
    .then(restaurants => {
        return restaurants.data;
    })
        .catch(error => {
            return error;
    });
};

export const getOneRestaurant = (id) => {
    return axios.get(`http://192.168.1.100:8080//api/restaurants/${id}`)
        .then(restaurant => {
            return restaurant.data;
        })
        .catch(error => {
            return error;
        })
};

export const getMenu = (id) => {
    return axios.get(`http://192.168.1.100:8080//api/restaurants/${id}/menu`)
        .then(foods => {
            return foods.data;
        })
        .catch(error => {
            return error;
        })
}

