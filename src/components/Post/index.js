import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Actions,
  Avatar,
  Container,
  Content,
  Header,
  Like,
  LikeButton,
  Name,
  TimePost,
} from './styles';

export default function Post({ data, userId }) {
  const [likePost, setLikePost] = useState(data?.likes);
  const [userLiked, setUserLiked] = useState(false);
  const navigation = useNavigation();

  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(new Date(), datePost, { locale: ptBR });
  }

  useEffect(() => {
    checkUserLiked();
  }, []);

  const docId = `${userId}_${data.id}`;

  const checkUserLiked = useCallback(async () => {
    // check post has been liked
    const doc = await firestore().collection('likes').doc(docId).get();

    if (doc.exists) {
      setUserLiked(true);
    }
  }, []);

  async function handleLikePost(id, likes) {
    // remove like if post's already liked
    if (userLiked) {
      /// update firestore (db)
      await firestore()
        .collection('posts')
        .doc(id)
        .update({
          likes: likes - 1,
        });

      // update state in aplication (screen)
      await firestore()
        .collection('likes')
        .doc(docId)
        .delete()
        .then(() => {
          setUserLiked(false);
          setLikePost(likes - 1);
        });

      return;
    }

    // create likes collection in firestore
    await firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: userId,
    });

    await firestore()
      .collection('posts')
      .doc(id)
      .update({
        likes: likes + 1,
      })
      .then(() => {
        setUserLiked(true);
        setLikePost(likes + 1);
      });
  }

  return (
    <Container>
      <Header
        onPress={() =>
          navigation.navigate('PostsUser', {
            title: data.autor,
            userId: data.userId,
          })
        }>
        {data.avatarUrl ? (
          <Avatar source={{ uri: data.avatarUrl }} />
        ) : (
          <Avatar source={require('../../assets/avatar.png')} />
        )}
        <Name numberOfLines={1}>{data?.autor}</Name>
      </Header>

      <Content>{data?.content}</Content>

      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <FontAwesome
            name={userLiked ? 'thumbs-up' : 'thumbs-o-up'}
            color="#fff"
            size={20}
          />
          {likePost !== 0 && <Like>{likePost}</Like>}
        </LikeButton>

        <TimePost>há {formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
