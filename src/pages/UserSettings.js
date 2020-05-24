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


import { Auth } from 'aws-amplify'

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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text onPress={this.logout.bind(this)} >Logout</Text>
                <Text>UserSettings Page, WELKOMEN BITCH</Text>
            </View>
        )
    }
};

export default UserSettings;