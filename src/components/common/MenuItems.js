import React from 'react';
import { Text, View, Image } from "react-native";

import { withNavigation } from "react-navigation";
import FastImage from "react-native-fast-image";
import styled from "styled-components";

import metrics from "../../metrics";
import { colors, fonts } from "../../theme";

const Container = styled(View) `
    width: ${() => metrics.getWidthFromDP('45%')}px;
    height: 100%;
    margin-horizontal: ${() => metrics.smallSize}px;
`;

const FlagPriceWrapper = styled(View)`
    align-self: flex-end;
`;

const DarkLayer = styled(View)`
    width: 100%;
    height: 70%;
    padding: ${() => metrics.smallSize}px;
    position: absolute;
    border-radius: ${() => metrics.borderRadius}px;
`;

const DishImage = styled(FastImage).attrs(({image}) => ({
    source: {uri: "http://192.168.1.100:8080//" + image}
}))`
    width: 100%;
    height: 100%;
`;

const DishTitle = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 1
})`
    margin-bottom: ${() => metrics.extraSmallSize}px;
    margin-top: ${() => metrics.getWidthFromDP("0.5%")}px;
    color: ${() => colors.black};
    font-size : ${() => metrics.getWidthFromDP("4.5%")}px;
    font-family: ${() => fonts.bold}
`;

type Props = {
    navigation: Object,
    image: string,
    title: string,
    price: number
}

const MenuItem = ({
    // onPress,
    image,
    title,
    // TODO: add price after testing
} :Props ):Object => (
    <Container>
        <View>
            <FastImage
                style={{height: 200, width: 200, borderRadius: 10}}
                source={{uri: "http://192.168.1.100:8080//" + image}}
            />

            <DarkLayer>
                {/*Flag price to be inserted here*/}
            </DarkLayer>

            <DishTitle>{title}</DishTitle>
            {/*TODO: Add reviews after making them in database*/}
        </View>
    </Container>
);

export default withNavigation(MenuItem);