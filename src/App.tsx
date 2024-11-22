import React from 'react';
import {
  StatusBar,
  View,
} from 'react-native';
import { CalculatorScreens } from './presentation/screens/CalculatorScreens';
import { styles } from './config/theme/app-theme';

function App() {

  return (
    <View style = {styles.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreens/>
    </View>
  );
}

export default App;
