import React, {Component} from 'react';

import {
    ScrollView,
    Text,
    StyleSheet, Button, View, ToastAndroid
} from 'react-native';

import {getItemsFromBasket} from "../functions/BasketFunctions";
import {findUserByUsername} from "../functions/UserFunctions";
import {getOneRestaurant} from "../functions/RestaurantFunctions";
import {createOneOrder} from "../functions/OrderFunctions";

import BasketCard from '../components/basket-detail/BasketCard'

import { Auth } from 'aws-amplify'
import {ipAddress} from "../config";
import {colors} from "../theme";
import type {Float} from "react-native/Libraries/Types/CodegenTypes";

let user = Auth.currentAuthenticatedUser();

class Basket extends Component {
    state = {
        username: null,
        userId: null,
        restaurantId: null,
        basketItems: [],
        grandTotal: null,
    };

    componentDidMount(): void {
        const {params} = this.props.navigation.state;
        const restaurantId = params ? params.restaurantId : null;

        this.setState({
            username: user._55.username,
        });

        findUserByUsername(user._55.username)
            .then(user => {
                console.log(user.id);
                this.setState({
                    userId: user.id,
                    restaurantId: restaurantId
                });
                getItemsFromBasket(this.state.restaurantId, this.state.userId)
                    .then(items => {
                        this.setState({
                            basketItems: items.basketItems,
                            grandTotal: items.grandTotal
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error)
            });
    }

    createOrder(sum: Float) {
        const order = {
            orderDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" +
                new Date().getDate(),
            orderTime: new Date().getHours() + ":" + new Date().getMinutes() + ":" +
                new Date().getSeconds(),
            orderStatus: false,
            orderCancelled: false,
            amount: sum,
        }

        createOneOrder(this.state.userId, this.state.restaurantId, order)
            .then(response => {
                ToastAndroid.show(response, ToastAndroid.SHORT);
            })
            .catch(error => {
                console.log(error)
            });

        this.setState({
            basketItems: [],
            grandTotal: null
        })
    }

    render() {
        let basketItems = this.state.basketItems;
        let element = [];
        let sum = 0.0;
        basketItems.map(items => {
            sum += items.food.foodPrice * items.quantity;
            element.push(
                <BasketCard
                    uri={ipAddress + "photos/valorant-ranks.jpg"}
                    foodName={items.food.foodName}
                    foodCategory={items.food.foodCategory.name}
                    foodQuantity={items.quantity}
                    foodPrice={items.food.foodPrice * items.quantity}
                />
            )
        });

        return(
            <View style={{flex: 1}}>
                <ScrollView
                    scrollEnabled={true}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    {element}
                    <Text style={styles.viewName}>{sum === 0 ? "Nothing ordered yet" :
                    `SubTotal : ${sum} Lei`}</Text>

                </ScrollView>
                {sum === 0 ? null :<Button color={colors.primary}
                                           title={"Order Now"}
                                           onPress={() => this.createOrder(sum)}
                /> }

            </View>
        )
    }
};

const styles = StyleSheet.create({
    viewName: {
        fontSize: 24,
        padding: 16,
        width: "100%",
        height: "100%",
        fontWeight: "700",
        bottom: 0,
        borderRadius: 6, textAlign: "center"
    }
})

export default Basket;