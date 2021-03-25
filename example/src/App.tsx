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
    <Center flex={1} background={colors.background}>
      <ReHighlight margin={{ top: 30 }} onPress={onBack}>
        <Text color={colors.darkText}>Open Half Modal</Text>
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
  console.log('colors:');
  return (
    <ThemeProvider>
      <AppSub />
    </ThemeProvider>
  );
}
