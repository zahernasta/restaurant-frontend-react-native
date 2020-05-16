import React, {Component} from 'react';

import {
    Text,
    View,
} from 'react-native';


import { Auth } from 'aws-amplify'

class FavoritePage extends Component {
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
                <Text>Favorite Page, WELKOMEN BITCH</Text>
            </View>
        )
    }
};

export default FavoritePage;