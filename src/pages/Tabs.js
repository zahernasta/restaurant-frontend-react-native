import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {createStackNavigator} from "react-navigation-stack";
import RestaurantPage from "./RestaurantPage";

import { colors, fonts } from '../theme'
import UserSettings from "./UserSettings";
import Home from "../nav/Home";
import Basket from "./Basket";


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
                <Image
                    source={require('../assets/signInButton.png')}
                    style={[styles.icon, { tintColor }]}
                />
            )
        }
    },
    Basket: {
        screen: Basket,
        navigationOptions: {
            title: 'Basket',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../assets/boomboxcropped.png')}
                    style={[styles.icon, { tintColor }]}
                />
            )
        }
    },
    UserSettings: {
        screen: UserSettings,
        navigationOptions: {
            title: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../assets/signUpButton.png')}
                    style={[styles.icon, { tintColor }]}
                />
            )
        }
    },

});

export default TabNavigatorAfterLogin;