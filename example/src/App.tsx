/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  ThemeProvider,
  Text,
  useColors,
  Center,
  PopupModal,
  ReHighlight,
  Highlight,
} from '@slick-ui/core';

const AppSub = () => {
  const colors = useColors();
  const [visible, setVisible] = React.useState(false);
  const onBack = () => {
    setVisible((v) => !v);
  };

  return (
    <Center style={{ flex: 1 }} background={colors.background}>
      <ReHighlight
        width={200}
        height={50}
        background={colors.lightBackground}
        margin={{ all: 40 }}
        border={{ all: 40 }}
        onPress={onBack}
      >
        <Center flex={1}>
          <Text color={colors.darkText}>Open Half Modal</Text>
        </Center>
      </ReHighlight>
      {/* <SlideModal
        fullScreen
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animationType="slideInBottom"
        backgroundColor={colors.darkText}
        {...{ visible, onBack }}
      >
        <Text>Hi</Text>
        <ReHighlight onPress={onBack}>
          <Text>Close Modal</Text>
        </ReHighlight>
      </SlideModal> */}
      <PopupModal
        backgroundBackEnabled
        style={{
          width: '100%',
          height: '40%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animationType="popOut"
        backgroundColor={colors.darkText}
        {...{ visible, onBack }}
      >
        <Text>Hi</Text>
        <Highlight underlay="#00000030" onPress={onBack}>
          <Text>Close Modal</Text>
        </Highlight>
      </PopupModal>
    </Center>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppSub />
    </ThemeProvider>
  );
}
