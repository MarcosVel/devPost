import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { Keyboard, StatusBar, TouchableWithoutFeedback } from 'react-native';
import {
  Button,
  ButtonText,
  CharacterCounter,
  Container,
  Input,
} from './styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AuthContext } from '../../contexts/auth';

const NewPost = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()} disabled={post === ''}>
          <ButtonText>Publicar</ButtonText>
        </Button>
      ),
    });
  }, [handlePost, navigation, post]);

  const handlePost = useCallback(async () => {
    let avatarUrl = null;

    try {
      let response = await storage()
        .ref('users')
        .child(user?.uid)
        .getDownloadURL();

      avatarUrl = response;
    } catch (error) {
      avatarUrl = null;
    }

    await firestore()
      .collection('posts')
      .add({
        created: new Date(),
        content: post,
        autor: user?.name,
        userId: user?.uid,
        likes: 0,
        avatarUrl,
      })
      .then(() => {
        setPost('');
        console.warn('post criado com sucesso');
      })
      .catch(error => {
        console.log(error);
      });

    navigation.goBack();
  }, [navigation, post, user]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <StatusBar backgroundColor="#202225" />
        <Input
          placeholder="O que vc anda pensando?"
          value={post}
          onChangeText={text => setPost(text)}
        />
        <CharacterCounter>{post.length}/250</CharacterCounter>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default NewPost;
