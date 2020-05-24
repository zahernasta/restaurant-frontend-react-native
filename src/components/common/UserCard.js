import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PriceFlag from "./FlagPrice";
import React from "react";

import {colors} from "../../theme";

export default ({uri, name, email}) => (
    <View style={styles.viewCard} >
        <Image style={styles.image} source={{ uri: uri }} />
        <View style={styles.viewName}>
            <Text style={styles.textName}>
                {name}
            </Text>
            <Text style={styles.textEmail}>
                {email}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    viewCard: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        height: 120,
        elevation: 10
    },
    image: {
        marginLeft: "5%",
        position: "relative",
        marginTop: 20,
        width: 70,
        height: 70,
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
        marginLeft: "25%",
        fontSize: 35,
        fontWeight: "700",
        color: "#000"
    },
    textEmail: {
        marginLeft: "25%",
        fontSize: 15,
        fontWeight: "200",
        color: colors.secondary
    }
});