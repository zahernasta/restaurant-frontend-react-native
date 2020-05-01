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

    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>UserSettings Page, WELKOMEN BITCH</Text>
            </View>
        )
    }
};

export default UserSettings;