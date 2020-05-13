import React, {Component, Fragment} from 'react';
import { StatusBar, View, Text } from 'react-native';

import { withNavigation } from 'react-navigation';
import styled from 'styled-components';

// import { Alert, TYPES } from '~/components/common/alert';
// import Loading from '~/components/common/Loading';

import {getOneFood} from "../functions/FoodFunction";

import FoodImage from '../components/food-detail/FoodImage';
import FoodCard from '../components/food-detail/common';

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
    };

    componentDidMount(): void {
        const {params} = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        this.setState({
            id: itemId
        });
        console.log(itemId);
        getOneFood(itemId)
            .then(food => {
                this.setState({
                    food: food
                })
            })
            .catch(error => {
                console.log(error);
        })
    }

    render() {
        return (
                <Fragment>
                    <Container>
                        <FoodImage
                            thumbnailImageURL={ipAddress + "photos/valorant-ranks.jpg"}
                            imageURL={ipAddress + "photos/valorant-ranks.jpg"}
                        />
                        {this.state.food == null ? null : <FoodCard dishDetail={this.state.food}/>}

                    </Container>
                </Fragment>
        )
    }

}



export default FoodDetail;