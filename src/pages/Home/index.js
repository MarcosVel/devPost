import firestore from '@react-native-firebase/firestore';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Post from '../../components/Post';

import { AuthContext } from '../../contexts/auth';
import { ButtonPost, Container, ListPosts } from './styles';

function Home() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fetchPosts() {
        firestore()
          .collection('posts')
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then(snapshot => {
            if (isActive) {
              setPosts([]);
              const postList = [];

              snapshot.docs.map(doc => {
                postList.push({ ...doc.data(), id: doc.id });
              });

              setPosts(postList);
              setLoading(false);
            }
          });
      }

      fetchPosts();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <Container>
      <Header />

      {loading ? (
        <Loading />
      ) : (
        <ListPosts
          data={posts}
          renderItem={({ item }) => <Post data={item} userId={user.uid} />}
        />
      )}

      <ButtonPost onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#fff" size={25} />
      </ButtonPost>
    </Container>
  );
}

export default Home;
