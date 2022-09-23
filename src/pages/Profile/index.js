import React, { useContext, useState } from 'react';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import {
  Avatar,
  Button,
  ButtonText,
  Container,
  Email,
  Name,
  UploadButton,
} from './styles';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [url, setUrl] = useState(null);

  return (
    <Container>
      <Header hasLogOut={true} />

      {url ? (
        <UploadButton activeOpacity={0.6}>
          <Avatar source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton activeOpacity={0.6}>
          <Avatar source={require('../../assets/avatar.png')} />
        </UploadButton>
      )}

      <Name>{user.name}</Name>
      <Email>{user.email}</Email>

      <Button activeOpacity={0.6}>
        <ButtonText>Atualizar perfil</ButtonText>
      </Button>
    </Container>
  );
};

export default Profile;
