import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './src/routes';

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#36393f" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}

export default App;
