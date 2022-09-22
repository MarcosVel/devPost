import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Container, Input, InputArea, List } from './styles';
import firestore from '@react-native-firebase/firestore';
import SearchList from '../../components/SearchList';

const Search = () => {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setUsers([]);
      return;
    }

    const subscriber = firestore()
      .collection('users')
      // .where('name', '>=', input)
      // .where('name', '<=', input + '\uf8ff')
      .orderBy('name', 'asc')
      .startAt(input.toUpperCase())
      .endAt(input.toLowerCase() + '\uf8ff')
      .onSnapshot(snapshot => {
        const listUsers = [];

        snapshot.forEach(doc => {
          listUsers.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        setUsers(listUsers);
      });

    return () => subscriber();
  }, [input]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <InputArea>
          <Feather name="search" size={20} color="#e52246" />
          <Input
            placeholder="Procurando por alguém?"
            value={input}
            onChangeText={text => setInput(text)}
          />
        </InputArea>
        <List
          data={users}
          renderItem={({ item }) => <SearchList data={item} />}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Search;
