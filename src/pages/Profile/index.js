import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
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

  useEffect(() => {
    async function loadAvatar() {
      try {
        let response = await storage()
          .ref('users')
          .child(user.uid)
          .getDownloadURL();

        setUrl(response);
      } catch (err) {
        console.log('Error loading user avatar', err);
      }
    }

    loadAvatar();
  }, []);

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

  function uploadAvatar() {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('fechou');
      } else if (response.error) {
        console.log('Error', response.errorMessage);
      } else {
        uploadFile(response).then(() => {
          uploadAvatarPosts();
        });
        setUrl(response.assets[0].uri);
      }
    });
  }

  function getFilePath(response) {
    // extract and return photo url
    return response.assets[0].uri;
  }

  async function uploadFile(response) {
    const fileSource = getFilePath(response);

    const storageRef = storage().ref('users').child(user.uid);

    return await storageRef.putFile(fileSource);
  }

  async function uploadAvatarPosts() {
    const storageRef = storage().ref('users').child(user.uid);

    await storageRef
      .getDownloadURL()
      .then(async image => {
        // aupdate all img from user in posts
        const postDocs = await firestore()
          .collection('posts')
          .where('userId', '==', user.uid)
          .get();

        postDocs.forEach(async doc => {
          await firestore().collection('posts').doc(doc.id).update({
            avatarUrl: image,
          });
        });
      })
      .catch(err => {
        console.log('Error update posts img', err);
      });
  }

  return (
    <>
      <Container>
        <Header hasLogOut={true} />

        {url ? (
          <UploadButton activeOpacity={0.6} onPress={() => uploadAvatar()}>
            <Avatar source={{ uri: url }} />
          </UploadButton>
        ) : (
          <UploadButton activeOpacity={0.6} onPress={() => uploadAvatar()}>
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
