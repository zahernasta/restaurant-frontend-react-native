import React, { Component, Fragment } from 'react';
import { View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components';

import AddOrderButton from "./AddOrderButton";
import ProgressiveImage from "../common/ProgressiveImage";
import { colors } from "../../theme";
import metrics from "../../metrics";

import {addItemsToBasket} from "../../functions/BasketFunctions";

// import SeeRestaurantButton from './SeeRestaurantButton';

const ImageWrapper = styled(View)`
  width: 100%;
  height: ${() => metrics.getHeightFromDP('27%')};
`;

const AddOrderButtonWrappers = styled(View)`
  height: ${() => metrics.getHeightFromDP('27%')};
  position: absolute;
  align-self: flex-end;
  justify-content: flex-end;
`;

const SmokeShadow = styled(LinearGradient).attrs({
    colors: ['transparent', colors.black, colors.black],
})`
  width: 100%;
  height: ${() => metrics.getHeightFromDP('28%')};
  margin-top: ${() => metrics.getHeightFromDP('12%')};
`;

const DishImageWrapper = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const BlackLayer = styled(View)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
`;

type Props = {
    thumbnailImageURL: string,
    imageURL: string,
    onPress: Function
};

type State = {
    isImageLoaded: boolean,
};

class FoodImage extends Component<Props, State> {
    state = {
        isImageLoaded: false,
    };

    onLoadImage = (): void => {
        const { isImageLoaded } = this.state;

        this.setState({
            isImageLoaded: !isImageLoaded,
        });
    };

    render() {
        const {
            thumbnailImageURL,
            imageURL,
            onPress
        } = this.props;

        return (
            <Fragment>
                <ImageWrapper>
                    <DishImageWrapper>
                        <ProgressiveImage
                            thumbnailImageUrl={thumbnailImageURL}
                            imageUrl={imageURL}
                            withBorder={false}
                        />
                        <BlackLayer />
                    </DishImageWrapper>
                    <SmokeShadow />
                </ImageWrapper>
                <AddOrderButtonWrappers>
                    <AddOrderButton onPress={onPress}/>
                </AddOrderButtonWrappers>
            </Fragment>
        );
    }
}

export default FoodImage;