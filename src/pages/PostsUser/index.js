import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

function PostsUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const userName = route.params.title;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: userName,
    });
  }, [navigation, userName]);

  return (
    <View>
      <Text>PostsUser</Text>
    </View>
  );
}

export default PostsUser;
