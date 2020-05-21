import React, {Component} from 'react';

import {
    Text,
    View,
} from 'react-native';


import { Auth } from 'aws-amplify'
import OrderCard from "../components/order-detail/OrderCard";
import {findUserByUsername} from "../functions/UserFunctions";
import {getOrdersByUserId} from "../functions/OrderFunctions";

let user = Auth.currentAuthenticatedUser();

class OrderPage extends Component {
    state = {
        userId: null,
        avatar: null,
        orderArray: [],
    };

    componentDidMount(): void {
        findUserByUsername(user._55.username)
            .then(user => {
                this.setState({
                    userId: user.id
                });
                getOrdersByUserId(this.state.userId)
                    .then(orders => {
                        this.setState({
                            orderArray: orders
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let array = this.state.orderArray;
        let elements = [];
        array.map(element => {
            console.log(element);
            elements.push(
                <OrderCard
                    number = {element.id}
                    orderDate={element.orderDate}
                    orderTime={element.orderTime}
                    orderStatus={element.orderStatus}
                    deliveryDate={element.deliveryDate}
                    deliveryTime={element.deliveryTime}
                    price={element.amount}
                />
            )
        })
        return(
            <View style={{flex: 1}}>
                {elements}
            </View>
        )
    }
};

export default OrderPage;