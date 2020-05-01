import React from 'react';
import {View} from 'react-native';

import ProgressiveImage from "./ProgressiveImage";
import styled from "styled-components";
import metrics from "../../metrics";
import { colors } from "../../theme";

const Container = styled(View)`
  width: 100%;
  height: ${() => metrics.getHeightFromDP('35%')}px;
`;

const DarkLayer = styled(View)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${() => colors.lightingDarkLayer};
`;

type Props = {
    thumbnailImageUrl: string,
    imageUrl: string,
};


const HeaderSection = ({ thumbnailImageUrl, imageUrl }: Props): Object => (
    <Container>
        <ProgressiveImage
            thumbnailImageUrl={thumbnailImageUrl}
            imageUrl={imageUrl}
        withBorder/>
        <DarkLayer />
    </Container>
);

export default HeaderSection;
