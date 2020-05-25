import React from "react";
import {Image, ScrollView, Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {ipAddress} from "../../config";
import {colors} from "../../theme";


export default ({uri, name, onPress}) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.cardContainer}>
            <View style={{flex: 2}}>
                <Image
                    source={{uri: uri}}
                    style={styles.imageCard}
                />
            </View>
            <View style={styles.textCard}>
                <Text>
                    {name}
                </Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    cardContainer: {
        height: 130,
        width: 130,
        backgroundColor: colors.white,
        marginLeft: 20,
        borderWidth: 0.5,
        borderColor: "#dddd",
        borderRadius: 6,
        elevation: 2,
    },

    imageCard: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
        borderRadius: 6
    },

    textCard: {
        flex: 1,
        paddingLeft: 10,
        paddingTop: 10,

    }
})