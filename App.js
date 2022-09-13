import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';

function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <AuthProvider>
        <StatusBar backgroundColor="#36393f" barStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;
