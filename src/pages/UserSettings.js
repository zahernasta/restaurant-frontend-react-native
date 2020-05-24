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
    Modal
} from 'react-native';

import {colors} from "../theme";
import UserCard from "../components/common/UserCard";
import { Auth } from 'aws-amplify'
import {logOut} from "../actions";
import connect from "react-redux/lib/connect/connect";
import {ipAddress} from "../config";

class UserSettings extends Component {
    state = {
        username: null,
        avatar: null
    };

    componentDidMount(): void {
        this.setState();
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
                    name={"Zaher"}
                    uri={ipAddress + "photos/valorant-ranks.jpg"}
                    email={"zaher.nasta19@gmail.com"}
                />
                <Text onPress={this.logout.bind(this)} >Logout</Text>
                <Text>UserSettings Page, WELKOMEN BITCH</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);