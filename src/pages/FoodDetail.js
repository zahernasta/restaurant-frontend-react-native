import React, {Component, Fragment} from 'react';
import { StatusBar, View, Text } from 'react-native';

import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

// import { Alert, TYPES } from '~/components/common/alert';
// import Loading from '~/components/common/Loading';

import {getOneFood} from "../functions/FoodFunctions";
import {findUserByUsername} from "../functions/UserFunctions";

import FoodImage from '../components/food-detail/FoodImage';
import FoodCard from '../components/food-detail/common';
import {addItemsToBasket} from "../functions/BasketFunctions";

import {colors} from "../theme";
import {ipAddress} from "../config";
import FoodInfo from "../components/food-detail/common/Header";
import IngredientItem from "../components/food-detail/common/Ingredients";

const Container = styled(View)`
  flex: 1;
  background-color: ${() => colors.black};
`;

type Props = {
    navigation: Object,
    dishDetail: Object,
    loading: Object,
    error: Object,
};

class FoodDetail extends Component<Props, {}> {

    state = {
        id: null,
        food: null,
        username: "",
        restaurantId: null,
        user: null
    };

    componentDidMount(): void {
        const {params} = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        const username = params ? params.username : null;
        const restaurantId = params ? params.restaurantId : null;
        this.setState({
            id: itemId,
            username: username,
            restaurantId: restaurantId
        });
        getOneFood(itemId)
            .then(food => {
                this.setState({
                    food: food
                })
            })
            .catch(error => {
                console.log(error);
        })

        findUserByUsername(this.state.username)
            .then(user => {
                this.setState({
                    user: user
                })
            })
            .catch(error => {
                console.log(error);
            })


    }

    addOrder() {
        console.log(this.state.food.id  ,this.state.user[0].id, this.state.restaurantId);
        const basketItem = {
            food: {
                id: this.state.food.id,
                foodName: this.state.food.foodName,
                foodIngredients: this.state.food.foodIngredients,
                foodQuantity: this.state.food.foodQuantity,
                foodPrice: this.state.food.foodPrice
            },
            quantity: 1
        }
        addItemsToBasket(this.state.restaurantId, this.state.user[0].id, basketItem)
    }

    render() {
        return (
                <Fragment>
                    <Container>
                        {this.state.user == null ? null : <FoodImage
                            thumbnailImageURL={ipAddress + "photos/valorant-ranks.jpg"}
                            imageURL={ipAddress + "photos/valorant-ranks.jpg"}
                            onPress={() => this.addOrder()}
                        />}

                        {this.state.food == null ? null : <FoodCard dishDetail={this.state.food}/>}

                    </Container>
                </Fragment>
        )
    }

}



export default FoodDetail;