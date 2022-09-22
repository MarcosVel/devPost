import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Container, Name } from './styles';

export default function SearchList({ data }) {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() =>
        navigation.navigate('UserPosts', { title: data.name, userId: data.id })
      }>
      <Name>{data.name}</Name>
    </Container>
  );
}
