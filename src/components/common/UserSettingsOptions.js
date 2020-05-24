import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";


export default({name, iconName, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.viewModel}>
            <View style={styles.viewContainerLeft}>
                <Text style={styles.textName}>
                    {name}
                </Text>
            </View>
            <View style={styles.viewContainerRight}>
                <IconMaterial
                    name={iconName}
                    size={26}
                />
            </View>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    viewModel: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    borderBottomWidth: 0.7,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
    marginBottom: 20,
    },
    viewContainerLeft: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    viewContainerRight: {
        flexDirection: "row",
        justifyContent:"flex-end"
    },
    textName: {
        fontSize: 20,
        marginBottom: 20
    }
});