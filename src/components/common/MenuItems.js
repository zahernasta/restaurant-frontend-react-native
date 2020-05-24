import React from 'react';
import { Text, View, Image, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";
import FastImage from "react-native-fast-image";
import styled from "styled-components";
import PriceFlag from "./FlagPrice";

import metrics from "../../metrics";
import { colors, fonts } from "../../theme";
import {ipAddress} from "../../config";

const Container = styled(View) `
    width: ${() => metrics.getWidthFromDP('50%')}px;
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
    source: {uri: ipAddress + image}
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

const QuantityTitle = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 1
})`
    margin-bottom: ${() => metrics.extraSmallSize}px;
    margin-top: ${() => metrics.getWidthFromDP("0.5%")}px;
    color: ${() => colors.gray};
    font-size : ${() => metrics.getWidthFromDP("4%")}px;
    font-family: ${() => fonts.bold}
`;

type Props = {
    navigation: Object,
    image: string,
    title: string,
    price: number
}

const MenuItem = ({
    onPress,
    price,
    image,
    title,
    quantity
} :Props ):Object => (
    <Container>
        <TouchableOpacity onPress={onPress}>
            <View>
                <FastImage
                    style={{height: 200, width: 200, borderRadius: 10}}
                    source={{uri: ipAddress + image}}
                />

                <DarkLayer>
                    <FlagPriceWrapper>
                        <PriceFlag
                            price={price}
                        />
                    </FlagPriceWrapper>
                </DarkLayer>

                <DishTitle>{title}</DishTitle>
                <QuantityTitle>{quantity}g</QuantityTitle>
                {/*TODO: Add reviews after making them in database*/}
            </View>
        </TouchableOpacity>
    </Container>
);

export default withNavigation(MenuItem);