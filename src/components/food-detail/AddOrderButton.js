import React from 'react';
import {
    TouchableOpacity, Platform, View, Text,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import styled from 'styled-components';


import metrics from "../../metrics";
import {colors} from "../../theme";

const Container = styled(View)`
  width: 100%;
  padding-right: ${() => metrics.largeSize}px;
  margin-bottom: ${() => metrics.mediumSize}px;
`;

const Wrapper = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  margin-bottom: ${() => metrics.smallSize}px;
  padding-vertical: ${() => metrics.smallSize}px;
  padding-horizontal: ${() => metrics.mediumSize}px;
  border-radius: 5px;
  background-color: ${() => colors.primary};
`;

const SeeText = styled(Text)`
  color: ${() => colors.white};
  font-size: ${() => {
    const percentage = Platform.OS === 'android' ? '4%' : '3.8%';
    return metrics.getWidthFromDP(percentage);
}};
  font-family: CircularStd-Black;
`;

// type Props = {
//     restaurantId: string,
//     navigation: Object,
// };

const AddOrderButton = (): Object => (
    <Container>
        <Wrapper
            // onPress={() => navigation.navigate(CONSTANTS.ROUTE_RESTAURANT_DETAIL, {
            //     [CONSTANTS.NAVIGATION_PARAM_ID]: restaurantId,
            // })
            // }
        >
            <SeeText>Add Order</SeeText>
        </Wrapper>
    </Container>
);

export default withNavigation(AddOrderButton);