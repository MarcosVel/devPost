import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { ButtonPost, Container } from './styles';

function Home() {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Home</Text>

      <ButtonPost onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#fff" size={25} />
      </ButtonPost>
    </Container>
  );
}

export default Home;
