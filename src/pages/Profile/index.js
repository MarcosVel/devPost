import React, { useContext, useState } from 'react';
import { Modal, Platform } from 'react-native';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import {
  Avatar,
  Background,
  Button,
  ButtonText,
  Container,
  Email,
  Input,
  ModalContainer,
  Name,
  SaveButton,
  SaveText,
  UploadButton,
} from './styles';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [url, setUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user.name);

  function updateUsername() {
    console.log('teste');
  }

  return (
    <>
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

        <Button activeOpacity={0.6} onPress={() => setModalVisible(true)}>
          <ButtonText>Atualizar perfil</ButtonText>
        </Button>
      </Container>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        hardwareAccelerated={true}>
        <Background>
          <ModalContainer behavior={Platform.OS === 'ios' && 'padding'}>
            <Input
              placeholder={user.name}
              value={name}
              onChangeText={text => setName(text)}
            />
            <SaveButton activeOpacity={0.6} onPress={updateUsername}>
              <SaveText>Salvar</SaveText>
            </SaveButton>
          </ModalContainer>
        </Background>
      </Modal>
    </>
  );
};

export default Profile;
