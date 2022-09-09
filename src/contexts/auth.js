import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    async function loadStore() {
      const userInStorage = await AsyncStorage.getItem('@devapp');

      if (userInStorage) {
        setUser(JSON.parse(userInStorage));
      }
    }

    loadStore();
  }, []);

  async function signUp(name, email, password) {
    setLoadingAuth(true);

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;
        await firestore()
          .collection('users')
          .doc(uid)
          .set({
            name: name,
            createdAt: new Date(),
          })
          .then(() => {
            let data = {
              uid: uid,
              name: name,
              email: value.user.email,
            };

            setUser(data);
            storageUser(data);
          });
      })
      .catch(error => {
        console.log(error);
      });

    setLoadingAuth(false);
  }

  async function signIn(email, password) {
    setLoadingAuth(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async value => {
        let uid = value.user.uid;

        const userProfile = await firestore()
          .collection('users')
          .doc(uid)
          .get();

        // console.log(userProfile.data().name);
        let data = {
          uid: uid,
          name: userProfile.data().name,
          email: value.user.email,
        };

        setUser(data);
        storageUser(data);
      })
      .catch(error => {
        console.log(error);
      });

    setLoadingAuth(false);
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('@devapp', JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, signUp, signIn, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
