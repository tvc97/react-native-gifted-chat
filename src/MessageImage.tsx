import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  ImageProps,
  ViewStyle,
  ImageStyle,
  ScrollView,
} from 'react-native'
// @ts-ignore
import Lightbox from 'react-native-lightbox'
import { IMessage } from './types'

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
})

interface MessageImageProps<TMessage extends IMessage = IMessage> {
  currentMessage?: TMessage
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle
  imageProps?: Partial<ImageProps>
  lightboxProps?: object
}

export default class MessageImage extends Component<MessageImageProps> {
  static defaultProps = {
    currentMessage: {
      image: null,
    },
    containerStyle: {},
    imageStyle: {},
    imageProps: {},
    lightboxProps: {},
  }

  static propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    imageStyle: PropTypes.object,
    imageProps: PropTypes.object,
    lightboxProps: PropTypes.object,
  }
  render() {
    const {
      containerStyle,
      lightboxProps,
      imageProps,
      imageStyle,
      currentMessage,
    } = this.props
    if (!!currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <Lightbox
            activeProps={{
              style: styles.imageActive,
            }}
            swipeToDismiss={false}
            {...lightboxProps}
          >
            <ScrollView
              minimumZoomScale={1}
              maximumZoomScale={2}
              centerContent={true}
            >
              <Image
                {...imageProps}
                style={[styles.image, imageStyle]}
                source={{ uri: currentMessage.image }}
              />
            </ScrollView>
          </Lightbox>
        </View>
      )
    }
    return null
  }
}
