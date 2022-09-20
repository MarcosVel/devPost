import firestore from '@react-native-firebase/firestore';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import Loading from '../../components/Loading';
import Post from '../../components/Post';
import { AuthContext } from '../../contexts/auth';
import { Container, ListPosts } from './styles';

function UserPosts() {
  const { user } = useContext(AuthContext);
  const route = useRoute();
  const navigation = useNavigation();
  const userName = route.params.title;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: userName,
    });
  }, [navigation, userName]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      firestore()
        .collection('posts')
        .where('userId', '==', route.params.userId)
        .orderBy('created', 'desc')
        .get()
        .then(snapshot => {
          const postList = [];
          snapshot.docs.map(doc => {
            postList.push({ ...doc.data(), id: doc.id });
          });

          if (isActive) {
            setPosts(postList);
            setLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <ListPosts
          data={posts}
          renderItem={({ item }) => <Post data={item} userId={user.uid} />}
        />
      )}
    </Container>
  );
}

export default UserPosts;
