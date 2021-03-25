/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Sizes } from '../metrics';
import { ReHighlight } from '../ReHighlight';
import { StyleSheet, StyleProp, ImageStyle, Image } from 'react-native';

/**
 * ChildItemProps
 */
export interface ChildItemProps {
  item: any;
  style?: StyleProp<ImageStyle>;
  onPress?: (index: number) => void;
  index: number;
  local: boolean;
  height: number;
  imageKey?: string;
}

/**
 * Child Item
 */
export default ({
  item,
  style,
  onPress,
  imageKey,
  index,
  local,
  height,
}: ChildItemProps) => {
  return (
    <ReHighlight
      style={[styles.container, style, { height: height }]}
      onPress={() => onPress?.(index)}
    >
      <Image
        style={[styles.image, { height: '100%' }]}
        source={
          local
            ? imageKey
              ? item[imageKey]
              : item
            : { uri: imageKey ? item[imageKey] : item }
        }
      />
    </ReHighlight>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: Sizes.SIZE_160,
    resizeMode: 'stretch',
  },
});
