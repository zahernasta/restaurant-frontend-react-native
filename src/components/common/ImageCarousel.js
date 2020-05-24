import React from "react";

import {Text, View, ScrollView, Image, Dimensions} from 'react-native';
import {ipAddress} from "../../config";

const {width} = Dimensions.get("window");
const height = width * 0.6;

export default ({images}) => (
    <View style={{width, height}}>
        <ScrollView
            pagingEnabled={true}
            horizontal={true}
            style={{width, height}}>
            {
                images.map((image, index) =>(
                    <Image
                        key={index}
                        source={{uri: ipAddress + image.photoLocation}}
                        style={{width, height, resizeMode: "cover"}}
                    />
                ))
            }
        </ScrollView>
    </View>
)