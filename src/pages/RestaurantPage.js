import  React, { Component, Fragment }  from 'react';

import {Text, View, Animated, FlatList, ScrollView, Button} from 'react-native';
import { getOneRestaurant } from "../functions/RestaurantFunctions.";
import AboutRestaurant  from "../components/restuarant-detail/AboutRestaurant";
import Header from "../components/common/Header";
import {getAllRestaurantPhotos} from "../functions/PhotoFunction";

import styled from "styled-components";
import Gallery from "../components/common/Gallery";

import {colors} from "../theme";

const Container = styled(View)`
    flex: 1;
`;

// const FloatingActionButtonWrapper = styled(View)`
//     width: 100%;
//     align-items: flex-end;
//     position: absolute;
//     margin-top: ${({ theme }) => theme.metrics.getHeightFromDP('25%') - 28}px;
//     padding-right: ${({ theme }) => theme.metrics.largeSize}px;
// `;

type Props = {
    userLocation: Object,
    navigation: Function,
    data: Object
}

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
        photoLocation: "",
        photos: [],
        content: false,
        isEmpty: true
    };

    componentDidMount(): void {
        const {params} = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        this.setState({
            id: itemId
        });

        getAllRestaurantPhotos(itemId)
            .then(photos => {
                if(photos.length !== 0) {
                    this.setState({
                        photoLocation: photos[0].photoLocation,
                        photos: photos,
                        isEmpty: false
                    })
                } else {
                    this.setState({
                        photoLocation: 'photos/placeholder.png',
                        isEmpty: true
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
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

    componentHideAndShow = () => {
        this.setState(previousState => ({content: !previousState.content}));
    };

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

    renderGallery = (
        images: Array
    ) => (
        <Gallery images={this.state.photos}/>
    )

    render() {
        return(
            <View style={{flex: 1}}>
            <ScrollView >
                <Fragment >
                    {
                        this.renderHeaderSection(
                        `http://192.168.0.103:8080/${this.state.photoLocation}`,
                        `http://192.168.0.103:8080/${this.state.photoLocation}`)
                    }
                    {
                        this.state.content ? this.renderGallery(this.state.photos) : null
                    }
                    {
                        this.state.isEmpty ? null
                            : <Button color={colors.primary}
                                      title={!this.state.content ? "Click to show more images" : "Click to hide images" }
                                      onPress={this.componentHideAndShow} />
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
            </ScrollView>
            </View>
        )
    }
}

export default RestaurantPage;