import React from 'react';
import { View, Text } from 'react-native';

import styled from 'styled-components';

import { colors } from "../../theme";
import metrics from "../../metrics";

const Wrapper = styled(View)`
  background-color: ${() => colors.primary};
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

const Price = styled(Text)`
  margin: ${() => `${metrics.extraSmallSize}px ${metrics.smallSize}px`};
  color: ${() => colors.white};
  font-size: ${() => metrics.getWidthFromDP('3.5%')}px;
  font-family: CircularStd-Black;
`;

type Props = {
    price: number,
};

const PriceFlag = ({ price }: Props): Object => (
    <Wrapper>
        <Price>{`Lei ${parseFloat(price).toFixed(2)}`}</Price>
    </Wrapper>
);

export default PriceFlag;