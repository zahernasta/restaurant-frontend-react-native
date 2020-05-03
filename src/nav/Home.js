import React from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Animated,
    Dimensions, Button
} from 'react-native'

import RestaurantCard from "../components/restuarant-detail/RestaurantCard";
import { connect } from 'react-redux'
import { Auth } from 'aws-amplify'

import {getAllRestaurants} from "../functions/RestaurantFunctions.";
import {getAllRestaurantPhotos} from "../functions/PhotoFunction";
import { logOut } from '../actions'
import { colors, fonts } from '../theme'
const { width, height } = Dimensions.get('window')

let user = Auth.currentAuthenticatedUser();
// const { attributes } = user;
let tempArray = [];

class Home extends React.Component {

    static navigationOptions = {
        header: null
    }
    state = {
        restaurantArray: [],
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    }

    AnimatedScale = new Animated.Value(1);
    componentDidMount() {

        this.animate();

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
    logout() {
        Auth.signOut()
            .then(() => {
                this.props.dispatchLogout()
            })
            .catch(err => {
                console.log('err: ', err)
            })
    }
    navigate() {
        this.props.navigation.navigate('Route1')
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
        for(let i = array.length - 1; i >= 0; i--) {
            elements.push(
                <RestaurantCard
                    uri={array[i][0] === undefined ? `http://192.168.0.103:8080/photos/placeholder.png`
                        : "http://192.168.0.103:8080/" + array[i][0].photoLocation}
                    title={array[i].name}
                    paragraph={array[i].description.substring(0, 80) + ",,,"}
                    location={array[i].address}
                    onPress={() => {
                        this.props.navigation.navigate("RestaurantPage", {
                            itemId: array[i].id
                        })
                    }}
                />
            )
        }

        return(
            <ScrollView>
                {elements}
                <Text onPress={this.logout.bind(this)} style={styles.welcome}>Logout</Text>
            </ScrollView>
            )

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    homeContainer: {
        alignItems: 'center'
    },
    welcome: {
        fontFamily: fonts.light,
        color: 'rgba(0, 0, 0, .85)',
        marginBottom: 26,
        fontSize: 22,
        textAlign: 'center'
    },
    registration: {
        fontFamily: fonts.base,
        color: 'rgba(0, 0, 0, .5)',
        marginTop: 20,
        fontSize: 16,
        paddingHorizontal: 20,
        textAlign: 'center'
    }
})

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)