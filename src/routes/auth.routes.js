import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Auth from '../pages/Auth';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
