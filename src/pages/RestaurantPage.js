import  React, { Component, Fragment }  from 'react';

import {Text, View, Animated, FlatList, ScrollView, Button, Dimensions} from 'react-native';
import { getOneRestaurant } from "../functions/RestaurantFunctions.";
import AboutRestaurant  from "../components/restuarant-detail/AboutRestaurant";
import Header from "../components/common/Header";
import {getAllRestaurantPhotos} from "../functions/PhotoFunction";
import { getMenu } from "../functions/RestaurantFunctions.";

import styled from "styled-components";
import Gallery from "../components/common/Gallery";
import Menu from "../components/common/Menu";

import MenuItem from "../components/common/MenuItems";

import { NetworkInfo } from "react-native-network-info";


import metrics from "../metrics";
import {colors, fonts} from "../theme";
import {ipAddress} from "../config";

const DishTitle = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 1
})`
    margin-left: 10px;
    margin-bottom: ${() => metrics.extraSmallSize}px;
    margin-top: ${() => metrics.getWidthFromDP("0.5%")}px;
    color: ${() => colors.primary};
    font-size : ${() => metrics.getWidthFromDP("9%")}px;
    font-family: ${() => fonts.bold}
`;

const Container = styled(View)`
    flex: 1;
`;


const { height } = Dimensions.get("window");
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
        isEmpty: true,
        screenHeight: 0,
        menu: [],
        foodName: "",
        foodPhoto: "",
        foodCategories: []
    };

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({
            screenHeight: contentHeight
        })
    }


    async componentDidMount(): void {

        const {params} = this.props.navigation.state;
        const itemId = params ? params.itemId : null;
        this.setState({
            id: itemId
        });

        let foodArray = [];
        let categoryArray = [];
        let uniqueArray = [];
        getMenu(itemId)
            .then((menu) => {
                // console.log(menu);
                this.setState({
                    menu: menu
                })

                this.state.menu.map(food => {
                    console.log(food);
                    categoryArray.push(food.foodCategory.name);
                })

                uniqueArray = [...new Set(categoryArray)];
                this.setState({
                    foodCategories: uniqueArray
                });
            })
            .catch(error => {
                console.log(error);
            });


        console.log(uniqueArray);
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
            })
            .catch(error => {
                console.log(error);
            });


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
        <Gallery images={images}/>
    );

    renderMenu = (
        menu: Array,
        photo: string,
    ) => (
        <Menu menu={menu} photo={photo}/>
    )


    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return(
            <Container>
            <View style={{flex: 1}}>
            <ScrollView
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
                <Fragment >
                    {
                        this.renderHeaderSection(
                        ipAddress + `${this.state.photoLocation}`,
                            ipAddress + `${this.state.photoLocation}`)
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
                    {
                        // this.renderMenu(this.state.menu, this.state.photoLocation)
                        <View>
                            {
                                this.state.foodCategories.map(category => {

                                    return(
                                        <View>
                                            <DishTitle>
                                                {category}
                                            </DishTitle>
                                            <ScrollView
                                                horizontal={true}
                                                style={{marginBottom: 10}}
                                            >
                                            {this.state.menu.map(food => {
                                                console.log(food.foodCategory.name);
                                                if(food.foodCategory.name === category){
                                                    console.log(food);
                                                    return (

                                                        <MenuItem
                                                            price={food.foodPrice}
                                                            image={"photos/valorant-ranks.jpg"}
                                                            title={food.foodName}
                                                            quantity={food.foodQuantity}
                                                            onPress={() => {
                                                                this.props.navigation.navigate("FoodDetail", {
                                                                    itemId: food.id
                                                                })
                                                            }}
                                                        />
                                                    )
                                                }
                                            })}
                                            </ScrollView>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    }

                </Fragment>
            </ScrollView>
            </View>
            </Container>
        )
    }
}

export default RestaurantPage;