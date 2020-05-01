import React from 'react'
import {createStackNavigator} from "react-navigation-stack";

import Home from "../nav/Home";
import RestaurantPage from "./RestaurantPage";
import {createAppContainer} from "react-navigation";

const StackNav = createStackNavigator({
    Home: {screen: Home},
    RestaurantPage: {screen: RestaurantPage},
});

export default StackNav;