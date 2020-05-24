import React, {Component} from "react";

import {Text, View, SafeAreaView, TextInput, Platform, StatusBar, StyleSheet} from "react-native";

import {colors} from "../../theme";


import Icon from "react-native-vector-icons/Ionicons";

export default () => (

    <View style={style.viewSearch}>
        <View style={style.viewSearchChild}>
            <Icon name={"ios-search"} size={20} style={{marginRight: 10, marginTop: 14,
            marginLeft: 10, color: colors.primary}}/>
            <TextInput
                placeholder={"Search for a Restaurant"}
                placeholderTextColor={colors.gray}
                style={style.textInputSearch}
            />
        </View>
    </View>
);

const style = StyleSheet.create({
    viewSearch: {
        height: Platform.OS === 'android' ? 100 : 80,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: "#dddd",
    },

    viewSearchChild: {
        flexDirection: "row",
        backgroundColor: colors.white,
        marginHorizontal: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: colors.black,
        shadowOpacity: 0.4,
        elevation: 2,
        marginTop: Platform.OS === 'android' ? 20 : null
    },

    textInputSearch: {
        flex: 1,
        fontWeight: '700',
        backgroundColor: colors.white
    }
})