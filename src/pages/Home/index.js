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
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  const fetchPosts = useCallback(() => {
    firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then(snapshot => {
        setPosts([]);
        const postList = [];

        snapshot.docs.map(doc => {
          postList.push({ ...doc.data(), id: doc.id });
        });

        setEmptyList(snapshot.empty);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) {
        fetchPosts();
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  async function handleRefreshPosts() {
    setLoadingRefresh(true);
    fetchPosts();
    setLoadingRefresh(false);
  }

  async function getMorePosts() {
    if (emptyList) {
      setLoading(false);
      return;
    }

    if (loading) return;

    firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then(snapshot => {
        const postList = [];

        snapshot.docs.map(doc => {
          postList.push({ ...doc.data(), id: doc.id });
        });

        setEmptyList(snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      });
  }

  return (
    <Container>
      <Header />

      {loading ? (
        <Loading />
      ) : (
        <ListPosts
          refreshing={loadingRefresh}
          onRefresh={handleRefreshPosts}
          onEndReached={() => getMorePosts()}
          onEndReachedThreshold={0.2}
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
