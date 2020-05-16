import React, {Component} from 'react';

import {
    Text,
    View,
} from 'react-native';


import { Auth } from 'aws-amplify'

class OrderPage extends Component {
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
                <Text>Order Page, WELKOMEN BITCH</Text>
            </View>
        )
    }
};

export default OrderPage;