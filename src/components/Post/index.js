import React, { useState } from 'react';
import {
  Avatar,
  Container,
  Content,
  Actions,
  Header,
  Name,
  LikeButton,
  Like,
  TimePost,
} from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Post({ data, userId }) {
  const [likePost, setLikePost] = useState(data?.likes);
  console.log(data);

  function formatTimePost() {
    // console.log(new Date(data.created.seconds * 1000));
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(new Date(), datePost, { locale: ptBR });
  }

  return (
    <Container>
      <Header>
        {data.avatarUrl ? (
          <Avatar source={{ uri: data.avatarUrl }} />
        ) : (
          <Avatar source={require('../../assets/avatar.png')} />
        )}
        <Name numberOfLines={1}>{data?.autor}</Name>
      </Header>

      <Content>{data?.content}</Content>

      <Actions>
        <LikeButton>
          <FontAwesome name="thumbs-o-up" color="#fff" size={20} />
          {likePost !== 0 && <Like>12</Like>}
        </LikeButton>

        <TimePost>há {formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
