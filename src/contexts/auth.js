import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signUp(name, email, password) {
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
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
