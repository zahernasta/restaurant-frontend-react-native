import React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Animated,
    Dimensions, Button, SafeAreaView
} from 'react-native'

import { ipAddress } from "../config";

import RestaurantCard from "../components/restuarant-detail/RestaurantCard";
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import {getAllRestaurants} from "../functions/RestaurantFunctions.";
import {getAllRestaurantPhotos} from "../functions/PhotoFunctions";
import { logOut } from '../actions'
import SearchBar from "../components/common/SearchBar";
import MiniRestaurantCard from "../components/common/MiniRestaurantCard";

import { colors, fonts } from '../theme'
import CategoryCard from "../components/common/CategoryCard";
const { width, height } = Dimensions.get('window');

let user = Auth.currentAuthenticatedUser();
let tempArray = [];

class Home extends React.Component {

    static navigationOptions = {
        header: null
    }
    state = {
        restaurantArray: [],
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        username: null,
    }

    constructor() {
        super();

    }

    AnimatedScale = new Animated.Value(1);
    componentDidMount() {

        this.animate();


        this.setState({
            username: user._55.username
        })
        getAllRestaurants()
            .then(restaurants => {
                restaurants.map(restaurant => {
                    getAllRestaurantPhotos(restaurant.id)
                        .then(photo => {
                            const object = Object.assign(restaurant, photo);
                            tempArray.push(object);
                            this.setState({
                                restaurantArray: tempArray
                            });
                        })
                        .catch(error => {
                            console.log(error)
                        })
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    animate() {
        Animated.timing(
            this.AnimatedScale,
            {
                toValue: .8,
                duration: 1250,
                useNativeDriver: true
            }
        ).start(() => {
            Animated.timing(
                this.AnimatedScale,
                {
                    toValue: 1,
                    duration: 1250,
                    useNativeDriver: true
                }
            ).start(() => this.animate())
        })
    }
    render() {
        let array = this.state.restaurantArray;
        let elements = [];
        let cardElements = [];
        array.map(restaurant => {
            elements.push(
                <MiniRestaurantCard
                    uri={restaurant[0] === undefined ? ipAddress + `photos/placeholder.png`
                        : ipAddress + restaurant[0].photoLocation}
                    name={restaurant.name}
                    description={restaurant.description.substring(0, 50) + ",,,"}
                    location={restaurant.address}
                    category={"Italian"}
                    onPress={() => {
                        this.props.navigation.navigate("RestaurantPage", {
                            itemId: restaurant.id
                        })
                    }}
                />
            )
        })



        return(
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.viewContainer}>
                <SearchBar/>
                <ScrollView>
                    <View style={styles.viewTextContainer}>
                        <Text style={styles.textHelp}>
                            What can we help you find, {this.state.username} ?
                        </Text>
                    </View>
                    <View style={styles.viewContainerHelp}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                            <CategoryCard
                                uri={ipAddress + "photos/valorant-ranks.jpg"}
                                name={"Italian"}
                            />
                            <CategoryCard
                                uri={ipAddress + "photos/valorant-ranks.jpg"}
                                name={"Lebanese"}
                            />
                            <CategoryCard
                                uri={ipAddress + "photos/valorant-ranks.jpg"}
                                name={"Japanese"}
                            />
                            <CategoryCard
                                uri={ipAddress + "photos/valorant-ranks.jpg"}
                                name={"Burgers"}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.viewContainerOtherRestaurants}>
                        <Text style={styles.textOtherRestaurants}>
                            Top Picks
                        </Text>

                        <Text style={styles.textOtherRestaurantsBelow}>
                            Top picks chosen by Users
                        </Text>

                        <View style={styles.viewOtherCard}>
                            <Image
                                source={{uri: ipAddress + 'photos/valorant-ranks.jpg'}}
                                style={styles.imageOtherCard}
                            />
                        </View>
                    </View>
                    <View style={{marginTop: 40}}>
                        <Text style={styles.textAllRestaurants}>
                            Restaurants around your area
                        </Text>
                        <View style={styles.viewMultipleCards}>
                            {elements}
                            {elements}
                        </View>
                    </View>
                </ScrollView>
            </View>
            </SafeAreaView>
            )

    }
}

const styles = StyleSheet.create({
    textHelp: {
        marginTop: 10,
        fontSize: 26,
        fontWeight: '700',
        paddingHorizontal: 20,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: colors.white
    },

    viewContainer: {
        flex: 1
    },

    viewTextContainer: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 10,
    },

    viewContainerHelp: {
        height: 130,
        marginTop: 20
    },

    viewContainerOtherRestaurants: {
        marginTop: 30,
        paddingHorizontal: 20
    },

    textOtherRestaurants: {
        fontSize: 26,
        fontWeight: "700"
    },

    textOtherRestaurantsBelow: {
        fontWeight:"100",
        marginTop: 10,
    },

    viewOtherCard: {
        width: width - 40,
        height: 200,
        marginTop: 20
    },

    imageOtherCard: {
        flex:1,
        height: null,
        width: null,
        resizeMode: 'cover',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#dddd",
    },

    textAllRestaurants: {
        fontSize: 26,
        fontWeight: "700",
        paddingHorizontal: 20
    },
    viewMultipleCards: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },


})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)