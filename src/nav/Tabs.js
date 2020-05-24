import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {createStackNavigator} from "react-navigation-stack";
import RestaurantPage from "../pages/RestaurantPage";

import { colors, fonts } from '../theme'
import UserSettings from "../pages/UserSettings";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import OrderPage from "../pages/OrderPage";
import FavoritePage from "../pages/FavoritePage";

import Icon from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import {color} from "react-native-reanimated";



const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26
    }
});


const TabNavigatorAfterLogin = createBottomTabNavigator({
    Restaurants: {
        screen: Home,
        navigationOptions: {
            title: 'Restaurants',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name={"ios-restaurant"}
                    color={tintColor}
                    size={26}
                />
            )
        }
    },
    Orders: {
        screen: OrderPage,
        navigationOptions: {
            title: "Orders",
            tabBarIcon: ({ tintColor }) => (
                <IconEntypo
                    name={"shopping-bag"}
                    color={tintColor}
                    size={26}
                />
            )
        }
    },
    Favorite: {
        screen: FavoritePage,
        navigationOptions : {
            title: "Favorites",
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name={"ios-heart-empty"}
                    color={tintColor}
                    size={26}
                />
            )
        }
    },
    UserSettings: {
        screen: UserSettings,
        navigationOptions: {
            title: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <IconMaterial
                    name={"account"}
                    color={tintColor}
                    size={26}
                />
            )
        }
    },

}, {
    tabBarOptions: {
        activeTintColor: colors.primary,
        inactiveTintColor: 'grey',
        style: {
            backgroundColor: colors.white,
            borderTopWidth: 0.5,
            borderTopColor: '#dddd',
            elevation: 1,
        }
    }
});

export default TabNavigatorAfterLogin;