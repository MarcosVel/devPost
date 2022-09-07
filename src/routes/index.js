import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

function Routes() {
  const signed = false;
  const loading = false;

  if (loading) {
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={50} color="#e52246" />
    </View>;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
