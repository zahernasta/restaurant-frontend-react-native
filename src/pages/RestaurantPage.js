import  React, { Component, Fragment }  from 'react';

import {
    Text,
    View,
    Animated,
    FlatList,
    ScrollView,
    Button,
    Dimensions,
    ToastAndroid,
    TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { getOneRestaurant } from "../functions/RestaurantFunctions";
import AboutRestaurant  from "../components/restuarant-detail/AboutRestaurant";
import Header from "../components/common/Header";
import {getAllRestaurantPhotos} from "../functions/PhotoFunctions";
import { getMenu } from "../functions/RestaurantFunctions";

import styled from "styled-components";
import Gallery from "../components/common/Gallery";
import Menu from "../components/common/Menu";

import MenuItem from "../components/common/MenuItems";
import ImageCarousel from "../components/common/ImageCarousel";

import { Auth } from 'aws-amplify'

import metrics from "../metrics";
import {colors, fonts} from "../theme";
import {ipAddress} from "../config";
import {addFavorites, findUserByUsername} from "../functions/UserFunctions";

import IconBasket from 'react-native-vector-icons/Fontisto';

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

type Props = {
    userLocation: Object,
    navigation: Function,
    data: Object
}

let user = Auth.currentAuthenticatedUser();

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
        foodCategories: [],
        username: ""
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
            id: itemId,
            username: user._55.username
        });

        let categoryArray = [];
        let uniqueArray = [];
        getMenu(itemId)
            .then((menu) => {
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
                this.props.navigation.setParams({
                    handleBasket: restaurant.id
                });
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

        this.props.navigation.setParams({
            handleFavorites: () => this.addFavorite()
        });
    }

    renderHeaderSection = (
        images: Array
    ) => (
        <ImageCarousel images={images}/>
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

    addFavorite = () => {
        findUserByUsername(user._55.username)
            .then(user => {
                addFavorites(user.id, this.state.id)
                    .then(message => {
                        ToastAndroid.show(message, ToastAndroid.SHORT);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    };

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
            headerRight: () => (
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Basket", {
                        restaurantId: params.handleBasket
                    })}
                                      style={{marginRight: 10, backgroundColor: colors.white, borderRadius: 100}}>
                        <IconBasket
                            name={"shopping-basket"}
                            size={23}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => params.handleFavorites() }  style={{marginRight: 10,
                        backgroundColor: colors.white, borderRadius: 100}}>
                        <IconBasket
                            name={"heart-alt"}
                            size={23}
                        />
                    </TouchableOpacity>
                </View>

            )
        }
    }

    render() {
        const scrollEnabled = this.state.screenHeight > height;
        return(
            <Container>
            <View style={{flex: 1, backgroundColor: colors.white}}>
            <ScrollView
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
                <Fragment >
                    {
                        this.renderHeaderSection(this.state.photos)
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
                        <View style={{flex: 1, marginHorizontal: 13}}>
                            <View style={{marginBottom: 10, marginTop: 10, flex: 1,
                                justifyContent: "flex-start", alignItems: "center",
                                marginHorizontal: 20}}>
                                <Text style={{fontSize: 40, fontWeight: "700"}}>
                                    MENU
                                </Text>
                            </View>

                            <View
                                style={{
                                    marginTop: 10,
                                    marginHorizontal: 15,
                                    borderBottomColor: colors.secondary,
                                    borderBottomWidth: 0.5,
                                }}
                            />
                            {
                                this.state.foodCategories.map(category => {

                                    return(
                                        <View style={{marginTop: 10}}>
                                            <DishTitle>
                                                {category}
                                            </DishTitle>
                                            <ScrollView
                                                horizontal={true}
                                                style={{marginBottom: 10}}
                                                showsHorizontalScrollIndicator={false}
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
                                                                    itemId: food.id,
                                                                    restaurantId: this.state.id,
                                                                    username: this.state.username
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
                            <View
                                style={{
                                    marginTop: 10,
                                    marginHorizontal: 15,
                                    borderBottomColor: colors.secondary,
                                    borderBottomWidth: 0.5,
                                }}
                            />
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