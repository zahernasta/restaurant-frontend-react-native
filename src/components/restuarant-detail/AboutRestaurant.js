import React, { Fragment } from 'react';

import {Image, Text, View, StyleSheet} from 'react-native';
import { fonts, colors } from '../../theme';

import IconEntypo from "react-native-vector-icons/Entypo";


const renderHoursAndAddress = (operatingHours, address) => (
    <Fragment>
        <View style={styles.sectionRow}>

            <IconEntypo name={"location"} style={styles.customIcon} />
            <Text  style={styles.defaultText}>
                {address}
            </Text>
        </View>

        <View style={styles.sectionRow}>
            <IconEntypo name={"clock"} style={styles.customIcon}/>
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
        <View
            style={{
                marginTop: 15,
                marginHorizontal: 15,
                borderBottomColor: colors.secondary,
                borderBottomWidth: 0.5,
            }}
        />
        <Text  style={styles.descriptionText}>
            {description}
        </Text>

        <View
            style={{
                marginTop: 10,
                marginHorizontal: 15,
                borderBottomColor: colors.secondary,
                borderBottomWidth: 0.5,
            }}
        />
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
        marginHorizontal: 10,
        color: colors.secondary,
        fontSize: 20,
        fontFamily: fonts.base
    },

    defaultText: {
        color: colors.secondary,
        fontSize: 13,
        fontFamily: fonts.base
    },

    sectionRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 10,
    },

    restaurantName: {
        width:"100%",
        color: colors.black,
        marginTop: 30,
        marginHorizontal: 10,
        fontSize: 40,
        fontFamily: fonts.bold
    },

    customIcon: {
        marginRight: 10,
        color: colors.primary
    }
});