import React from 'react';
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

export default function Post() {
  return (
    <Container>
      <Header>
        <Avatar source={require('../../assets/avatar.png')} />
        <Name numberOfLines={1}>Sujeito Programador</Name>
      </Header>

      <Content>Esse é um post</Content>

      <Actions>
        <LikeButton>
          <FontAwesome name="thumbs-o-up" color="#fff" size={20} />
          <Like>12</Like>
        </LikeButton>

        <TimePost>há um minuto</TimePost>
      </Actions>
    </Container>
  );
}
