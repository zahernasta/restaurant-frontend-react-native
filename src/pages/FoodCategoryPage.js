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
import {getRestaurantsByCategory} from "../functions/RestaurantFunctions";
import NewRestaurantCard from "../components/common/NewRestaurantCard";
import {colors} from "../theme";

const user = Auth.currentAuthenticatedUser();

class FoodCategoryPage extends Component {
    state = {
        restaurantArray: [],
        categoryName: null
    };

    componentDidMount(): void {

        const {params} = this.props.navigation.state;
        const categoryName = params ? params.categoryName : null;

        this.setState({
            categoryName: categoryName
        })

        getRestaurantsByCategory(categoryName)
            .then(restaurants => {
                this.setState({
                    restaurantArray: restaurants
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {

        let array = this.state.restaurantArray;
        let elements = [];
        array.map(restaurant => {
            elements.push(
                <NewRestaurantCard
                    uri={restaurant.photoList[0] === undefined ? ipAddress + `photos/placeholder.png`
                        : ipAddress + restaurant.photoList[0].photoLocation}
                    category={restaurant.cuisineCategory.name}
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
            <View style={{flex: 1, backgroundColor: colors.white}}>
                <ScrollView>
                    <View style={styles.viewName}>
                        <Text style={styles.textCategory}>CATEGORY</Text>
                        <Text style={styles.textCategoryName}>{this.state.categoryName}</Text>
                    </View>
                    {elements}
                </ScrollView>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    viewName: {
        fontSize: 30,
        padding: 16,
        fontWeight: "700",
        bottom: 0,
        borderRadius: 6,
        marginTop: 40,
        marginLeft: 5
    },
    textCategory: {
        fontSize: 30,
        fontWeight:"700",

    },
    textCategoryName: {
        fontSize: 24,
        fontWeight: "200",
        color: colors.secondary
    }
})


export default FoodCategoryPage;