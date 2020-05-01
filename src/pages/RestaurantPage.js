import  React, { Component, Fragment }  from 'react';

import {Text, View, Animated, FlatList} from 'react-native';
import { getOneRestaurant } from "../functions/RestaurantFunctions.";
import AboutRestaurant  from "../components/restuarant-detail/AboutRestaurant";
import Header from "../components/common/Header";
import FloatingActionButton from "../components/common/FloatingActionButton";

import styled from "styled-components";


const Container = styled(View)`
    flex: 1;
`;

const FloatingActionButtonWrapper = styled(View)`
    width: 100%;
    align-items: flex-end;
    position: absolute;
    margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('25%') - 28}px;
    padding-right: ${({ theme }) => theme.metrics.largeSize}px;
`;

type Props = {
    userLocation: Object,
    navigation: Function,
    data: Object
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class RestaurantPage extends Component<Props, {}> {

    state = {
        id: null,
        address: "",
        deliveryStartTime: "",
        deliveryEndTime: "",
        restaurantStartTime: "",
        restaurantEndTime: "",
        email: "",
        name: "",
        deliveryCosts: "",
    };

    componentDidMount(): void {
        const {params} = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        this.setState({
            id: itemId
        });

        getOneRestaurant(itemId)
            .then(restaurant => {
                this.setState({
                    address: restaurant.address,
                    deliveryStartTime: restaurant.deliveryStartTime,
                    deliveryEndTime: restaurant.deliveryEndTime,
                    restaurantStartTime: restaurant.restaurantStartTime,
                    restaurantEndTime: restaurant.restaurantEndTime,
                    email: restaurant.email,
                    name: restaurant.name,
                    deliveryCosts: restaurant.deliveryCosts,
                    description: restaurant.description
                });
                console.log(restaurant);
            })
            .catch(error => {
                console.log(error);
            })
    }

    renderHeaderSection = (
        imageUrl: string,
        thumbnailImageUrl: string
    ) => (
        <Header thumbnailImageUrl={thumbnailImageUrl} imageUrl={imageUrl}/>
    );

    renderAboutRestaurant = (
        address: string,
        operatingHours: string,
        name: string,
        description: string
    ) => (
        <AboutRestaurant
            address={address}
            operatingHours={operatingHours}
            name={name}
            description={description}
        />
    );

    render() {

        return(
            <Container>
                <Fragment>
                    {
                        this.renderHeaderSection(
                        "https://picsum.photos/700",
                        "https://picsum.photos/700")
                    }
                    {
                        this.renderAboutRestaurant
                        (
                            this.state.address,
                            this.state.restaurantStartTime + " - "
                                + this.state.restaurantEndTime,
                            this.state.name,
                            this.state.description
                        )
                    }
                </Fragment>
            </Container>
        )
    }
}

export default RestaurantPage;