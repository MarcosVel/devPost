import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  Button,
  ButtonText,
  CharacterCounter,
  Container,
  Input,
} from './styles';

const NewPost = () => {
  const navigation = useNavigation();
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button>
          <ButtonText>Publicar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  return (
    <Container>
      <StatusBar backgroundColor="#202225" />
      <Input
        placeholder="O que vc anda pensando?"
        value={post}
        onChangeText={text => setPost(text)}
      />
      <CharacterCounter>{post.length}/250</CharacterCounter>
    </Container>
  );
};

export default NewPost;
