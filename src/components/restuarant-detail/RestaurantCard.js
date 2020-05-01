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

export default ({uri, title, paragraph, location, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.viewCard} >
            <Image style={styles.image} source={{ uri: uri }} />
            <View style={styles.viewName}>
                <Text style={styles.textName}>
                    {title}
                </Text>
                <Text style={styles.textDescription}>
                    {paragraph}
                </Text>
                <Text style={styles.textLocation}>
                    {location}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    viewCard: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 6,
        height: 160
    },
    image: {
        backgroundColor: "#ccc",
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        borderRadius: 6
    },
    viewName: {
        padding: 16,
        position: "absolute",
        width: "100%",
        height: "100%",
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        borderRadius: 6
    },
    textName: {
        fontSize: 32,
        fontWeight: "700",
        color: "#ffffff"
    },
    textDescription: {
        fontSize: 14,
        color: "#ffffff"
    },
    textLocation: {
        fontSize: 14,
        color: "#ffffff"
    }
});
