import React, {Component} from 'react';

import {
    Platform,
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Modal
} from 'react-native';

import {getItemsFromBasket} from "../functions/BasketFunctions";
import {findUserByUsername} from "../functions/UserFunctions";
import {getOneRestaurant} from "../functions/RestaurantFunctions.";

import { Auth } from 'aws-amplify'

let user = Auth.currentAuthenticatedUser();

class Basket extends Component {
    state = {
        username: null,
        userId: null,
        restaurantId: 1,
        basketItems: [],
        grandTotal: null,
    };

    componentDidMount(): void {
        this.setState({
            username: user._55.username,
        });

        findUserByUsername(user._55.username)
            .then(user => {
                this.setState({
                    userId: user.id
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

    render() {
        let basketItems = this.state.basketItems;
        let element = [];
        basketItems.map(items => {
            element.push(
                <Text>{items.food.foodName}</Text>
            )
        });

        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {element}
            </View>
        )
    }
};

export default Basket;