import firestore from '@react-native-firebase/firestore';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
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
  const { user, setUser, storageUser } = useContext(AuthContext);
  const [url, setUrl] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user.name);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  async function updateUsername() {
    setLoadingUpdate(true);

    if (name === '') {
      return;
    }

    await firestore().collection('users').doc(user.uid).update({
      name: name,
    });

    const postsDocs = await firestore()
      .collection('posts')
      .where('userId', '==', user.uid)
      .get();

    postsDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: name,
      });
    });

    let data = {
      uid: user.uid,
      name: name,
      email: user.email,
    };

    setUser(data);
    storageUser(data);
    setLoadingUpdate(false);
    setModalVisible(false);
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
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <Background>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <ModalContainer behavior={Platform.OS === 'ios' && 'padding'}>
                <Input
                  placeholder={user.name}
                  value={name}
                  onChangeText={text => setName(text)}
                />
                <SaveButton activeOpacity={0.6} onPress={updateUsername}>
                  {loadingUpdate ? (
                    <ActivityIndicator size={22} color="#fff" />
                  ) : (
                    <SaveText>Salvar</SaveText>
                  )}
                </SaveButton>
              </ModalContainer>
            </TouchableWithoutFeedback>
          </Background>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Profile;
