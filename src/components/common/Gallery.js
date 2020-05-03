import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import ImageViewer from '@dwqs/react-native-image-viewer';
import GalleryImage from './GalleryImage';

type Props = {
    images: Array,
}

export default class Gallery extends Component<Props, {}> {
    constructor(props) {
        super(props);
        this.showLightbox = (index) => {
            this.setState({
                index,
                shown: true,
            });
        };
        this.hideLightbox = () => {
            this.setState({
                index: 0,
                shown: false,
            });
        };
    }
    state = {
        index: 0,
        shown: false,
    };
    render() {
        const { images } = this.props;
        const { index, shown } = this.state;
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {
                    images.map((image, idx) => (
                            <GalleryImage
                                index={idx}
                                key={idx}
                                onPress={this.showLightbox}
                                uri={image.photoLocation}
                           />
                        )
                    )
                }
                <ImageViewer
                    shown={shown}
                    imageUrls={images}
                    onClose={this.hideLightbox}
                    index={index}
                />
            </View>
        );
    }
}