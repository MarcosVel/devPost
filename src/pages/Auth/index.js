import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../contexts/auth';
import {
  Button,
  ButtonText,
  Container,
  Input,
  PasswordInput,
  SignUp,
  SignUpText,
  Title,
  TITLE_RED,
  TogglePassword,
} from './styles';

function Auth() {
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

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

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return login ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <PasswordInput>
          <Input
            placeholder="******"
            value={password}
            autoCorrect={false}
            secureTextEntry={showPassword}
            onChangeText={text => setPassword(text)}
          />
          <TogglePassword onPress={handleToggle}>
            {showPassword ? (
              <Feather name="eye" size={20} color="#606061" />
            ) : (
              <Feather name="eye-off" size={20} color="#606061" />
            )}
          </TogglePassword>
        </PasswordInput>

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
    </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Title>
          Dev<Title style={TITLE_RED}>Post</Title>
        </Title>

        <Input
          placeholder="Seu nome"
          value={name}
          onChangeText={text => setName(text)}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="seuemail@gmail.com"
          autoCapitalize="none"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <PasswordInput>
          <Input
            placeholder="******"
            value={password}
            autoCorrect={false}
            secureTextEntry={showPassword}
            onChangeText={text => setPassword(text)}
          />
          <TogglePassword onPress={handleToggle}>
            {showPassword ? (
              <Feather name="eye" size={20} color="#606061" />
            ) : (
              <Feather name="eye-off" size={20} color="#606061" />
            )}
          </TogglePassword>
        </PasswordInput>

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
    </TouchableWithoutFeedback>
  );
}

export default Auth;
