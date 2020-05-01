import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { colors, fonts } from '../theme'
import SignIn from './SignIn'
import SignUp from './SignUp'
import {createStackNavigator} from "react-navigation-stack";

const styles = StyleSheet.create({
    icon: {
        width: 26,
        height: 26
    }
});


const TabNavigator = createBottomTabNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: 'Sign In',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../assets/signInButton.png')}
                    style={[styles.icon, { tintColor }]}
                />
            )
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: 'Sign Up',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../assets/signUpButton.png')}
                    style={[styles.icon, { tintColor }]}
                />
            )
        }
    }
});

export default TabNavigator;