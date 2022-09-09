import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../contexts/auth';

const Profile = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
