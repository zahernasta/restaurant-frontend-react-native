import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'native-base';
import { Image } from 'react-native-animatable';
const WIDTH = Dimensions.get('window').width;
export default class GalleryImage extends Component {
    render() {
        const { uri, index } = this.props;
        console.log(uri);
        return (
            // <Button
            //     // onPress={() => onPress(index)}
            //     style={{
            //         backgroundColor: 'transparent',
            //         borderRadius: 0,
            //         height: 80,
            //         width: WIDTH / 3,
            //     }}
            // >
            <View
                style={{
                borderRadius: 0,
                height: 80,
                width: WIDTH / 3,
            }}>
                <Image
                    animation={'bounceIn'}
                    delay={100 * index}
                    duration={500}
                    source={{ uri: "http://192.168.0.103:8080/" + this.props.uri }}
                    style={{
                        height: 77,
                        left: 2,
                        right: 0,
                        position: 'absolute',
                        resizeMode: 'cover',
                        top: 3,

                        width: WIDTH / 3.05,
                    }}
                />
            </View>

            // </Button>
        );
    }
}
