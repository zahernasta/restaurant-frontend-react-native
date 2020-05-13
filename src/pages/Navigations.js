import React from 'react'
import {createStackNavigator} from "react-navigation-stack";

import Home from "../nav/Home";
import RestaurantPage from "./RestaurantPage";
import FoodDetail from "./FoodDetail";
import {createAppContainer} from "react-navigation";

const StackNav = createStackNavigator({
    Home: {screen: Home},
    RestaurantPage: {screen: RestaurantPage},
    FoodDetail: {screen: FoodDetail}
});

export default StackNav;