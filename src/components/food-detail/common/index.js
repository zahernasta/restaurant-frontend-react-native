import React from 'react';
import { Text, View } from 'react-native';

import styled from 'styled-components';

import FoodInfo from './Header';

import metrics from "../../../metrics";
import { colors } from "../../../theme";

import IngredientItem from "./Ingredients";

const Container = styled(View)`
  flex: 1;
  padding-horizontal: ${() => metrics.largeSize}px;
  padding-top: ${() => metrics.largeSize}px;
  margin-horizontal: ${() => metrics.largeSize}px;
  border-top-left-radius: ${() => metrics.borderRadius}px;
  border-top-right-radius: ${() => metrics.borderRadius}px;
  background-color: ${() => colors.white};
`;

const DishDescription = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 3,
})`
  margin-top: ${() => metrics.mediumSize}px;
  color: ${() => colors.gray};
  font-size: ${() => metrics.getWidthFromDP('4.2%')}px;
  font-family: CircularStd-Book;
`;

type Props = {
    dishDetail: Object,
};

const FoodCard = ({ dishDetail }: Props): Object => {
    // const { food } = dishDetail;

    return (
        <Container>
            <FoodInfo
                price={dishDetail.foodPrice.toFixed(2)}
                title={dishDetail.foodName}
            />
            <IngredientItem
                ingredient={dishDetail.foodIngredients}
            />
        </Container>
    );
};

export default FoodCard;