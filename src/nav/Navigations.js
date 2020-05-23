import React from 'react'
import {createStackNavigator} from "react-navigation-stack";

import Home from "../pages/Home";
import RestaurantPage from "../pages/RestaurantPage";
import FoodDetail from "../pages/FoodDetail";
import Basket from "../pages/Basket";
import {createAppContainer} from "react-navigation";
import UserSettings from "../pages/UserSettings";
import OrderItemPage from "../pages/OrderItemPage";

const StackNav = createStackNavigator({
    Home: {screen: Home},
    RestaurantPage: {screen: RestaurantPage},
    FoodDetail: {screen: FoodDetail},
    Basket: {screen: Basket},
    OrderItems: {screen: OrderItemPage},
    UserSettings: {screen: UserSettings}
});

export default StackNav;