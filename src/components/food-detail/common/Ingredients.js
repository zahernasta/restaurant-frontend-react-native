import React from 'react';
import { Text } from 'react-native';

import styled from 'styled-components';

import metrics from "../../../metrics";
import { colors } from "../../../theme";

const IngredientsText = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 3,
})`
  padding-top: ${() => (metrics.largeSize : 0)}px;
  padding-bottom: ${() => metrics.mediumSize}px;
  color: ${() => colors.gray};
  font-size: ${() => metrics.getWidthFromDP('4%')};
  font-family: CircularStd-Book;
`;

type Props = {
    ingredient: string,
};

const IngredientItem = ({ ingredient }: Props) => (
    <IngredientsText
    >
        {ingredient}
    </IngredientsText>
);

export default IngredientItem;