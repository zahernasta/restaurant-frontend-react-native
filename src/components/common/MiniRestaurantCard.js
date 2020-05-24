import React from "react";
import {Image, Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import {ipAddress} from "../../config";
import {colors} from "../../theme";

const { width, height } = Dimensions.get('window');

export default({uri, category, name, description, location, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.viewRestaurantCard}>
            <View style={{flex: 1}}>
                <Image
                    source={{uri: uri}}
                    style={styles.imageRestaurantCard}
                />
            </View>
            <View style={styles.viewRestaurantCardText}>
                <Text style={styles.textCategory}>{category}</Text>
                <Text style={styles.textName}>{name}</Text>
                {/*<Text style={styles.textDescription}>{description}</Text>*/}
                <Text style={styles.textLocation}>{location}</Text>
            </View>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    viewRestaurantCard: {
        width: width/2 - 25,
        height: width/2 - 25,
        borderWidth: 0.5,
        borderColor: "#dddd",
        borderRadius: 6,
        marginBottom: 10,
    },

    imageRestaurantCard: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: "cover",
        borderRadius: 6,
    },

    textCategory: {
        fontSize: 14, color: colors.primary
    },

    textName: {
        fontSize: 14, fontWeight:"bold"
    },

    textDescription: {
        fontSize: 12
    },

    textLocation: {
        fontSize: 10, color: colors.secondary
    },

    viewRestaurantCardText: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-evenly",
        paddingLeft: 10
    }
})