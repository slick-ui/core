import React, { Component, ReactNode } from 'react';
import {
  View,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  ViewPropTypes,
} from 'react-native';
import { ReHighlight } from '../ReHighlight';
import Collapsible from './Collapsible';

const VIEW_PROPS = Object.keys(ViewPropTypes);
const COLLAPSIBLE_PROPS = Object.keys(Collapsible.prototype);

/**
 * AccordionProps
 */
export interface AccordionProps<T = any> {
  sections: T[];
  renderHeader: (
    section: T,
    key: number,
    isActive: boolean,
    sections: T[]
  ) => ReactNode;
  renderContent: (
    section: T,
    key: number,
    isActive: boolean,
    sections: T[]
  ) => ReactNode;
  renderFooter?: (
    section: T,
    key: number,
    isActive: boolean,
    sections: T[]
  ) => ReactNode;
  renderSectionTitle?: (
    section: T,
    key: number,
    isActive: boolean
  ) => ReactNode;
  activeSections: number[];
  onChange?: (indexes: number[]) => void;
  align?: 'top' | 'center' | 'bottom';
  duration?: number;
  easing?: string;
  overlayColor?: string;
  disabled?: boolean;
  expandFromBottom?: boolean;
  expandMultiple?: boolean;
  onAnimationEnd?: (section: T, key: number) => void;
  sectionContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export default class Accordion extends Component<AccordionProps> {
  static defaultProps = {
    underlayColor: 'black',
    disabled: false,
    expandFromBottom: false,
    expandMultiple: false,
    touchableComponent: TouchableHighlight,
    renderSectionTitle: () => null,
    onAnimationEnd: () => null,
    sectionContainerStyle: {},
  };

  _toggleSection(section: any) {
    if (!this.props.disabled) {
      const { activeSections, expandMultiple, onChange } = this.props;

      let updatedSections = [];

      if (activeSections.includes(section)) {
        updatedSections = activeSections.filter((a) => a !== section);
      } else if (expandMultiple) {
        updatedSections = [...activeSections, section];
      } else {
        updatedSections = [section];
      }

      onChange && onChange(updatedSections);
    }
  }

  render() {
    let viewProps: any = {};
    let collapsibleProps: any = {};

    Object.keys(this.props).forEach((key) => {
      if (COLLAPSIBLE_PROPS.includes(key)) {
        collapsibleProps[key] = (this.props as any)[key];
      } else if (VIEW_PROPS.includes(key)) {
        viewProps[key] = (this.props as any)[key];
      }
    });

    const {
      activeSections,
      containerStyle,
      sectionContainerStyle,
      expandFromBottom,
      sections,
      overlayColor,
      onAnimationEnd,
      renderContent,
      renderHeader,
      renderFooter,
      renderSectionTitle,
    } = this.props;

    const renderCollapsible = (section: any, key: number) => (
      <Collapsible
        collapsed={!activeSections.includes(key)}
        {...collapsibleProps}
        onAnimationEnd={() => onAnimationEnd?.(section, key)}
      >
        {renderContent(section, key, activeSections.includes(key), sections)}
      </Collapsible>
    );

    return (
      <View style={containerStyle} {...viewProps}>
        {sections.map((section, key) => (
          <View key={key} style={sectionContainerStyle}>
            {renderSectionTitle?.(section, key, activeSections.includes(key))}

            {expandFromBottom && renderCollapsible(section, key)}

            <ReHighlight
              onPress={() => this._toggleSection(key)}
              overlayColor={overlayColor}
            >
              {renderHeader(
                section,
                key,
                activeSections.includes(key),
                sections
              )}
            </ReHighlight>

            {!expandFromBottom && renderCollapsible(section, key)}

            {renderFooter &&
              renderFooter(
                section,
                key,
                activeSections.includes(key),
                sections
              )}
          </View>
        ))}
      </View>
    );
  }
}
