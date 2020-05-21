import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styled from 'styled-components';

import { colors } from "../../theme";
import metrics from "../../metrics";

const Price = styled(Text)`
  margin: ${() => `${metrics.extraSmallSize}px ${metrics.smallSize}px`};
  color: ${() => colors.white};
  font-size: ${() => metrics.getWidthFromDP('3.5%')}px;
  font-family: CircularStd-Black;
`;

type Props = {
    style: Object,
    onPress: Function
};

const OrderDetailFlag = ({ onPress, style }: Props): Object => (
    <TouchableOpacity onPress={onPress}>
        <View style={style}>
            <Price>Order detail</Price>
        </View>
    </TouchableOpacity>
);

export default OrderDetailFlag;