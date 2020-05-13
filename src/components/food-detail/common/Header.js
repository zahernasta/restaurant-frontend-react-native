import React from 'react';
import { Platform, Text, View } from 'react-native';
import styled from 'styled-components';

import FlagPrice from '../../../components/common/FlagPrice';


import { colors} from "../../../theme";
import metrics from "../../../metrics";

const ContentWrapper = styled(View)`
  width: 100%;
`;

const TitleAndPriceWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PriceWrapper = styled(View)`
  height: 100%;
  padding-top: ${() => metrics.extraSmallSize / 1.5}px;
`;

const DishTitle = styled(Text).attrs({
    ellipsizeMode: 'tail',
    numberOfLines: 2,
})`
  width: 80%;
  padding-bottom: ${() => metrics.extraSmallSize}px;
  color: ${() => colors.black};
  font-size: ${() => {
    const percentage = Platform.OS === 'android' ? '6.5%' : '6%';
    return metrics.getWidthFromDP(percentage);
}};
  font-family: CircularStd-Black;
`;


type Props = {
    price: number,
    title: string,
};

const FoodInfo = ({
                      price, title
                  }: Props) => (
    <ContentWrapper>
        <TitleAndPriceWrapper>
            <DishTitle>{title}</DishTitle>
            <PriceWrapper>
                <FlagPrice
                    price={price}
                />
            </PriceWrapper>
        </TitleAndPriceWrapper>
    </ContentWrapper>
);

export default FoodInfo;