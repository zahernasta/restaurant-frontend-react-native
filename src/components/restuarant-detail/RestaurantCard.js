import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Button,
    TouchableOpacity,
    Dimensions
} from "react-native";
import {colors} from "../../theme";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

const {width, height} = Dimensions.get("window");

export default ({uri, title, category, location, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.viewCard} >
            <Image style={styles.image} source={{ uri: uri }} />
            <View style={styles.viewName}>
                <Text style={styles.textName}>
                    {title}
                </Text>
                <View style={{flexDirection: "row"}}>
                    <IconMaterial name={"restaurant"} size={16} style={{color: colors.primary, marginRight: 4}}/>
                    <Text style={styles.textDescription}>
                        {category}
                    </Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    <IconMaterial name={"room"} size={16} style={{color: colors.primary, marginRight: 4}}/>
                    <Text style={styles.textLocation}>
                        {location}
                    </Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    viewCard: {
        marginVertical: 0,
        borderRadius: 6,
        marginHorizontal: 8,
        height: 220,
        width: width - 60,
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
        borderRadius: 6,
        justifyContent: "space-evenly"
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
        fontSize: 12,
        color: "#ffffff"
    }
});
