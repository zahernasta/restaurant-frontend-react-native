import React, { Fragment } from 'react';

import {Image, Text, View, StyleSheet} from 'react-native';
import { fonts, colors } from '../../theme';


const renderHoursAndAddress = (operatingHours, address) => (
    <Fragment>
        <View style={styles.sectionRow}>
            <Image style={styles.customIcon} source={require("../../assets/shape.png")} />
            <Text  style={styles.defaultText}>
                {address}
            </Text>
        </View>

        <View style={styles.sectionRow}>
            <Image style={styles.customIcon} source={require("../../assets/boomboxcropped.png")} />
            <Text  style={styles.defaultText}>
                {operatingHours}
            </Text>
        </View>
    </Fragment>
);

export default ({address, operatingHours, name, description}) => (
    <View style={styles.container}>
        <Text  style={styles.restaurantName}>
            {name}
        </Text>
        {renderHoursAndAddress(operatingHours, address)}
        <Text  style={styles.descriptionText}>
            {description}
        </Text>
    </View>
)

const styles = StyleSheet.create({

    container: {
        width: "100%",
        paddingLeft: 20,
        backgroundColor: "#fff"
    },

    descriptionText: {
        marginTop: 20,
        marginBottom: 20,
        color: colors.secondary,
        fontSize: 20,
        fontFamily: fonts.base
    },

    defaultText: {
        color: colors.primary,
        fontSize: 15,
        fontFamily: fonts.base
    },

    sectionRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 5
    },

    restaurantName: {
        width:"100%",
        color: colors.black,
        fontSize: 40,
        fontFamily: fonts.bold
    },

    customIcon: {
        width: 18,
        height: 18,
        marginLeft: -5,
        marginRight: 5,
        color: colors.primary
    }
});