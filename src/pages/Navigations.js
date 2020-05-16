import React from 'react'
import {createStackNavigator} from "react-navigation-stack";

import Home from "../nav/Home";
import RestaurantPage from "./RestaurantPage";
import FoodDetail from "./FoodDetail";
import Basket from "./Basket";
import {createAppContainer} from "react-navigation";
import UserSettings from "./UserSettings";

const StackNav = createStackNavigator({
    Home: {screen: Home},
    RestaurantPage: {screen: RestaurantPage},
    FoodDetail: {screen: FoodDetail},
    Basket: {screen: Basket},
    UserSettings: {screen: UserSettings}
});

export default StackNav;