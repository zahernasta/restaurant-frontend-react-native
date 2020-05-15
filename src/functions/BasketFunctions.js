import axios from 'axios'
import {ipAddress} from "../config";

export const addItemsToBasket = (restaurantId, userId, item) => {
    console.log(item);
    axios.post(ipAddress + `api/baskets/users/${userId}/restaurants/${restaurantId}/basketItems`, {
        food: {
            id: item.food.id,
            foodName: item.food.foodName,
            foodIngredients: item.food.foodIngredients,
            foodQuantity: item.food.foodQuantity,
            foodPrice: item.food.foodPrice
        },
        quantity: item.quantity
    })
        .then (message => {
            console.log(message)
        })
        .catch(error => {
            console.log(error);
        })
};

export const getItemsFromBasket = (restaurantId, userId) => {
    console.log(restaurantId, userId);
    return axios.get(ipAddress + `api/baskets/users/${userId}/restaurants/${restaurantId}`)
        .then(items => {
            return items.data
        })
        .catch(error => {
            console.log(error);
        })
}