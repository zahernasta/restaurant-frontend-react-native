import React, {Component} from 'react';

import {
    Platform,
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Modal, ScrollView, ToastAndroid
} from 'react-native';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'
import {colors} from "../theme";
import UserCard from "../components/common/UserCard";
import { Auth } from 'aws-amplify'
import {logOut} from "../actions";
import connect from "react-redux/lib/connect/connect";
import {ipAddress} from "../config";
import UserSettingsOptions from "../components/common/UserSettingsOptions";

const user = Auth.currentAuthenticatedUser();

class UserSettings extends Component {
    state = {
        username: null,
        avatar: null,
        email: null,
    };

    componentDidMount(): void {
        this.setState({
            username: user._55.username,
            email: user._55.attributes.email
        });
    }
    logout() {
        Auth.signOut()
            .then(() => {
                this.props.dispatchLogout()
            })
            .catch(err => {
                console.log('err: ', err)
            })
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: colors.white}}>
                <UserCard
                    name={this.state.username}
                    uri={ipAddress + "photos/valorant-ranks.jpg"}
                    email={this.state.email}
                />
                <ScrollView style={styles.viewInformation}>
                    <Text style={styles.accountInformation}>
                        Account Settings
                    </Text>
                    <UserSettingsOptions
                        name={"Personal Information"}
                        iconName={"account"}
                        onPress={() => ToastAndroid.show("Personal", ToastAndroid.SHORT)}
                    />
                    <UserSettingsOptions
                        name={"Payments And Cards"}
                        iconName={"cash-multiple"}
                        onPress={() => ToastAndroid.show("Payment", ToastAndroid.SHORT)}
                    />
                    <UserSettingsOptions
                        name={"Notifications"}
                        iconName={"bell-ring-outline"}
                        onPress={() => ToastAndroid.show("Notifications", ToastAndroid.SHORT)}
                    />
                    <UserSettingsOptions
                        name={"Logout"}
                        iconName={"exit-to-app"}
                        onPress={() => this.logout()}
                    />
                </ScrollView>
            </View>
        )
    }
};

const mapDispatchToProps = {
    dispatchLogout: () => logOut()
}

const mapStateToProps = state => ({
    auth: state.auth
})

const styles = StyleSheet.create({
    viewInformation: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
    },

    accountInformation: {
        fontSize: 20,
        fontWeight: "100",
        color: colors.secondary
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);