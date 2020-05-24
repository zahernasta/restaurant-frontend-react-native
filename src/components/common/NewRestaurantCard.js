import React from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback} from "react-native";
import {colors} from "../../theme";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
const { width, height } = Dimensions.get('window');


export default ({uri, name, category, description, location, onPress}) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.viewRestaurantCard}>
            <View style={{flex: 1}}>
                <Image
                    source={{uri: uri}}
                    style={styles.imageRestaurantCard}
                />
            </View>
            <View style={styles.viewRestaurantCardText}>
                <View style={{flexDirection: "row", marginTop: 10}}>
                    <IconMaterial name={"restaurant"} size={16} style={{color: colors.primary}}/>
                    <Text style={styles.textCategory}>{category}</Text>
                    <IconMaterial name={"room"} size={16} style={{color: colors.primary}}/>
                    <Text style={styles.textLocation}>{location}</Text>

                </View>
                <Text style={styles.textName}>{name}</Text>
                <Text style={styles.textDescription}>{description}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
    viewRestaurantCard: {
        height: width/1.3,
        marginBottom: 20,
        marginHorizontal: 20,
    },

    imageRestaurantCard: {
        flex: 1,
        width: "100%",
        height: "150%",
        resizeMode: "cover",
        borderRadius: 10,
    },

    textCategory: {
        fontSize: 13, color: colors.secondary, marginRight: 10
    },

    textName: {
        fontSize: 30, fontWeight:"bold"
    },

    textDescription: {
        fontSize: 18, color: colors.secondary
    },

    textLocation: {
        fontSize: 13, color: colors.secondary
    },

    viewRestaurantCardText: {
        flex: 1,
        alignItems: "flex-start",
    }
})