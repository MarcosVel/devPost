import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function UserPosts() {
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
            console.log(postList);
            setLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View>
      <Text>UserPosts</Text>
    </View>
  );
}

export default UserPosts;
