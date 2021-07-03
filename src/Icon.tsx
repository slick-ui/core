import React, { Component } from 'react';
import type { IconProps as BaseIconProps } from 'react-native-vector-icons/Icon';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';

export type IconType =
  | 'Ion'
  | 'Material'
  | 'MaterialCommunity'
  | 'SimpleLine'
  | 'AntDesign'
  | 'Evil'
  | 'Entypo'
  | 'Feather'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Fontisto'
  | 'Oct';

export interface IconProps extends BaseIconProps {
  /**
   * @description Icon Type
   * @default Ion
   * @type {IconType}
   * @memberof IconProps
   */
  type?: IconType;
}

/**
 * Icon
 */
export default class Icon extends Component<IconProps> {
  render() {
    const { type, ...rest } = this.props;
    switch (type) {
      case 'AntDesign':
        return <AntDesign {...rest} />;
      case 'Entypo':
        return <Entypo {...rest} />;
      case 'Evil':
        return <EvilIcons {...rest} />;
      case 'Feather':
        return <Feather {...rest} />;
      case 'FontAwesome':
        return <FontAwesome {...rest} />;
      case 'FontAwesome5':
        return <FontAwesome5 {...rest} />;
      case 'Fontisto':
        return <Fontisto {...rest} />;
      case 'Material':
        return <MaterialIcons {...rest} />;
      case 'MaterialCommunity':
        return <MaterialCommunityIcons {...rest} />;
      case 'Oct':
        return <Octicons {...rest} />;
      case 'SimpleLine':
        return <SimpleLineIcons {...rest} />;
      default:
        return <IonIcons {...rest} />;
    }
  }
}
