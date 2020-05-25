import React, {Component} from "react";

import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BasketCard from "../components/basket-detail/BasketCard";
import {ipAddress} from "../config";
import {colors} from "../theme";

class OrderItemPage extends Component<Props, {}> {

    state = {
        itemsArray: [],
    }

    componentDidMount(): void {
        const {params} = this.props.navigation.state;
        const array = params ? params.items : null;

        this.setState({
            itemsArray: array,
        })
    }

    render() {

        let elements = [];
        let orderItems = this.state.itemsArray;

        orderItems.map(item => {
            elements.push(
                <BasketCard
                    uri={ipAddress + "photos/valorant-ranks.jpg"}
                    foodName={item.food.foodName}
                    foodCategory={item.food.foodCategory.name}
                    foodQuantity={item.quantity}
                    foodPrice={item.food.foodPrice * item.quantity}
                />
            )
        })

        return(
            <View style={{flex:1, marginTop: 5, backgroundColor: colors.white}}>
                <Text style={styles.viewName}>Ordered Items</Text>
                <ScrollView>
                    {elements}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewName: {
        fontSize: 24,
        padding: 16,
        fontWeight: "700",
        bottom: 0,
        borderRadius: 6, textAlign: "center"
    }
})

export default OrderItemPage;