import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Button,
    TouchableOpacity,
    ToastAndroid
} from "react-native";

import PriceFlag from "../common/FlagPrice";
import {colors} from "../../theme";
import OrderDetailFlag from "../common/OrderDetailFlag";

export default ({number, orderDate, orderTime, orderStatus = false, deliveryDate, deliveryTime, price, onPress}) =>  (
    <View style={styles.viewCard}>
        <View style={{marginTop: 10}}>
            <View style={styles.orderLine}>
                <Text style={styles.orderNumberText}>Order number : {number}</Text>
                <OrderDetailFlag style={styles.orderFlag}
                                 onPress={onPress} />
            </View>
            <View style={styles.otherDetail}>
                <Text style={styles.orderDateTime}>Order Date: {orderDate}</Text>
                <Text style={styles.orderDateTime}>Order Time: {orderTime}</Text>
                {orderStatus === false ?
                    <View>
                        <Text style={styles.orderStatusRefused}>Status: Not Delivered</Text>
                        <Text style={styles.orderDeliveryDateTime}>
                            Delivery Date: TBD
                        </Text>
                        <Text style={styles.orderDeliveryDateTime}>
                            Delivery Time: TBD
                        </Text>
                    </View>
                    :
                    <View>
                        <Text style={styles.orderStatusAccepted}>Status: Delivered</Text>
                        <Text style={styles.orderDeliveryDateTime}>
                            Delivery Date: {deliveryDate}
                        </Text>
                        <Text style={styles.orderDeliveryDateTime}>
                            Delivery Time: {deliveryTime}
                        </Text>
                    </View>
                }
            <Text style={styles.totalPrice}>Total Price: </Text>
            <View style={styles.finalOrder}>
                <PriceFlag
                    price={price}
                />
            </View>
                <View
                    style={{
                        marginTop: 30,
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
            </View>
        </View>
    </View>
);

const styles = {
    viewCard : {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 6,
        flexDirection: "column",
        backgroundColor: "#fff",
        height: 220
    },

    orderLine: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,

    },

    orderFlag : {
        backgroundColor: colors.primary,
        borderRadius: 6,
        marginRight: 6,
        marginTop: 3,
    },

    orderNumberText: {
        fontSize: 20,
        fontWeight: "bold"
    },

    orderDateTime: {
        fontSize: 16,
        fontWeight: "bold"
    },

    orderDeliveryDateTime: {
        fontSize: 14,
        marginLeft: 15,
    },

    orderStatusAccepted: {
        fontSize: 16,
        fontWeight: "bold",
        color: "green"
    },

    orderStatusRefused: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red"
    },

    otherDetail: {
        marginTop: 5,
        marginLeft: 10,
    },

    finalOrder: {
        marginTop: -15,
        marginRight: 6,
        alignItems: "flex-end"
    },

    totalPrice: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: 16
    }
};