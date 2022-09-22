import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Container, Input, InputArea, List } from './styles';

const Search = () => {
  const [input, setInput] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <InputArea>
          <Feather name="search" size={20} color="#e52246" />
          <Input
            placeholder="Procurando por alguém?"
            value={input}
            onChangeText={text => setInput(text.target.value)}
          />
        </InputArea>
        <List />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Search;
