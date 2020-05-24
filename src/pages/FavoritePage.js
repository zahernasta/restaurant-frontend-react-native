import React, {Component} from 'react';

import {
    ScrollView, StyleSheet,
    Text,
    View,
} from 'react-native';


import { Auth } from 'aws-amplify'
import {findUserByUsername, getUserFavorites} from "../functions/UserFunctions";
import RestaurantCard from "../components/restuarant-detail/RestaurantCard";
import {ipAddress} from "../config";

import NewRestaurantCard from "../components/common/NewRestaurantCard";

const user = Auth.currentAuthenticatedUser();

class FavoritePage extends Component {
    state = {
        username: null,
        avatar: null,
        favoritesArray: [],
    };

    componentDidMount(): void {

        findUserByUsername(user._55.username)
            .then(user => {
                getUserFavorites(user.id)
                    .then(favorites => {
                        this.setState({
                            favoritesArray: favorites
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        let array = this.state.favoritesArray;
        let elements = [];

        array.map(restaurant => {
            console.log(restaurant.photoList[0]);
            elements.push(
                <NewRestaurantCard
                    uri={restaurant.photoList[0] === undefined ? ipAddress + `photos/placeholder.png`
                        : ipAddress + restaurant.photoList[0].photoLocation}
                    category={"Italian"}
                    name={restaurant.name}
                    description={restaurant.description.substring(0, 80) + "..."}
                    location={restaurant.address}
                    onPress={() => {
                        this.props.navigation.navigate("RestaurantPage", {
                            itemId: restaurant.id
                        })
                    }}
                />
            )
        })

        return(
            <View style={{flex: 1}}>
                <Text style={styles.viewName}>Your Favorites</Text>
                <ScrollView>
                    {elements}
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    viewName: {
        fontSize: 24,
        padding: 16,
        fontWeight: "700",
        bottom: 0,
        borderRadius: 6, textAlign: "center"
    }
})


export default FavoritePage;