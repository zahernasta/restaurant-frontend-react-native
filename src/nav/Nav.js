import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { NavigationContainer } from "@react-navigation/native";

import TabNavigatorAfterLogin from "../pages/Tabs";
import StackNav from "../pages/Navigations";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import Home from "./Home";
import RestaurantPage from "../pages/RestaurantPage";
import FoodDetail from "../pages/FoodDetail";

const switchNavigation = createStackNavigator(
    {
        TabNavigatorAfterLogin: {
            screen: TabNavigatorAfterLogin,
            navigationOptions:{headerShown: false}
        },

        Home: {
            screen: Home
        },

        RestaurantPage: {
            screen: RestaurantPage,
            navigationOptions: {
                headerShown: true,
                headerTransparent: true,
                title: "",
                style: {backgroundColor: "white"}}
        },

        FoodDetail : {
            screen: FoodDetail,
            navigationOptions: {
                headerShown: true,
                headerTransparent: true,
                title: "",
                style: {backgroundColor: "white"}
            }
        }

    }
);
const Container = createAppContainer(switchNavigation);

class Nav extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Container/>
            </NavigationContainer>

        )
    }
}

export default Nav;