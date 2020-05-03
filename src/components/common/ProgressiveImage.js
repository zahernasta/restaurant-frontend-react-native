import React, {Component} from 'react';
import { View, StyleSheet, Animated } from "react-native";
import styled from "styled-components";

import { colors, fonts } from "../../theme";
import metrics from "../../metrics";

const ForegroundLayer = styled(View)`
    background-color: ${() => colors.progressiveImageForeground }
    border-radius: ${({ withBorder }) => (withBorder ? metrics.borderRadius : 0)};
`;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    },

    imageOverlay: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
    }
});

type Props = {
    thumbnailImageUrl: string,
    withBorder: boolean,
    imageUrl: string
}

class ProgressiveImage extends Component<Props, {}> {
    thumbnailOpacity = new Animated.Value(0);
    imageOpacity = new Animated.Value(0);

    onThumbnailLoaded = () => {
        Animated.timing(this.thumbnailOpacity, {
            toValue: 1,
        }).start();
    };

    onImageLoaded = () => {
        Animated.timing(this.imageOpacity, {
            toValue: 1,
        }).start();
    };

    render() {
        const { thumbnailImageUrl, withBorder, imageUrl } = this.props;

        return (
            <ForegroundLayer
                withBorder={withBorder}
            >
                <Animated.Image
                    style={[
                        styles.container,
                        {
                            // borderRadius: withBorder ? metrics.borderRadius : 0,
                            opacity: this.thumbnailOpacity,
                        },
                    ]}
                    source={{ uri: thumbnailImageUrl }}
                    onLoad={this.onThumbnailLoaded}
                    blurRadius={1}
                    resize="cover"
                />
                <Animated.Image
                    style={[
                        styles.imageOverlay,
                        {
                            borderRadius: withBorder ? metrics.borderRadius : 0,
                            opacity: this.imageOpacity,
                        },
                        styles.container,
                    ]}
                    onLoad={this.onImageLoaded}
                    source={{ uri: imageUrl }}
                    resize="cover"
                />
            </ForegroundLayer>
        )
    }
}

export default ProgressiveImage;