import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

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
      })
      .catch(error => {
        console.log(error);
      });

    setLoadingAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, signUp, signIn, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
