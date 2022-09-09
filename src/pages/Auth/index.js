import React, { useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import {
  Button,
  ButtonText,
  Container,
  Input,
  SignUp,
  SignUpText,
  Title,
  TITLE_RED,
} from './styles';

function Auth() {
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin() {
    setName('');
    setEmail('');
    setPassword('');
    setLogin(!login);
  }

  async function handleSignIn() {
    if (email === '' || password === '') {
      alert('Please complete all required fields');
      return;
    }

    await signIn(email, password);
  }

  async function handleSignUp() {
    if (name === '' || email === '' || password === '') {
      alert('Please complete all required fields');
      return;
    }

    await signUp(name, email, password);
  }

  return login ? (
    <Container>
      <Title>
        Dev<Title style={TITLE_RED}>Post</Title>
      </Title>

      <Input
        placeholder="seuemail@gmail.com"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="******"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button onPress={handleSignIn}>
        {loadingAuth ? (
          <ActivityIndicator size={26} color="#fff" />
        ) : (
          <ButtonText>Acessar</ButtonText>
        )}
      </Button>
      <SignUp>
        <SignUpText onPress={toggleLogin}>Criar uma conta</SignUpText>
      </SignUp>
    </Container>
  ) : (
    <Container>
      <Title>
        Dev<Title style={TITLE_RED}>Post</Title>
      </Title>

      <Input
        placeholder="Seu nome"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Input
        placeholder="seuemail@gmail.com"
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="******"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={26} color="#fff" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>
      <SignUp>
        <SignUpText onPress={toggleLogin}>Já possuo uma conta</SignUpText>
      </SignUp>
    </Container>
  );
}

export default Auth;
