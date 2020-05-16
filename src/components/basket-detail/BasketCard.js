import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Button,
    TouchableOpacity
} from "react-native";

import PriceFlag from "../common/FlagPrice";

export default ({uri, foodName, foodCategory, foodQuantity, foodPrice}) => (
    <TouchableOpacity>
        <View style={styles.viewCard} >
            <Image style={styles.image} source={{ uri: uri }} />
            <View style={styles.viewName}>
                <Text style={styles.textName}>
                    {foodName}
                </Text>
                <Text style={styles.textDescription}>
                    Category: {foodCategory}
                </Text>
                <Text style={styles.textLocation}>
                    Quantity: {foodQuantity}
                </Text>
                <View style={styles.price}>
                    <PriceFlag  price={foodPrice}/>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    viewCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        flexDirection: "column",
        borderRadius: 6,
        justifyContent: "center",
        backgroundColor: "#fff",
        height: 140
    },
    image: {
        marginLeft: "2.5%",
        position: "relative",
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    viewName: {
        padding: 16,
        position: "absolute",
        width: "100%",
        height: "100%",
        bottom: 0,
        borderRadius: 6
    },
    textName: {
        marginTop: "0%",
        marginLeft: "30%",
        fontSize: 24,
        fontWeight: "700",
        color: "#000"
    },
    textDescription: {
        marginLeft: "30%",
        fontSize: 12,
        color: "#000"
    },
    textLocation: {
        marginLeft: "30%",
        fontSize: 20,
        color: "#000"
    },
    price: {
        marginLeft: "28%",
        height: 12,
        marginTop: "2.5%",
    }
});
