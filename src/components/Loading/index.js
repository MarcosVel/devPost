import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <ActivityIndicator size={26} color="#fff" />
    </Container>
  );
}
