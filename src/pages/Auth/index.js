import React, { useState } from 'react';
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
  const [login, setLogin] = useState(true);

  return login ? (
    <Container>
      <Title>
        Dev<Title style={TITLE_RED}>Post</Title>
      </Title>

      <Input placeholder="seuemail@gmail.com" autoCapitalize="none" />
      <Input placeholder="******" secureTextEntry />

      <Button>
        <ButtonText>Acessar</ButtonText>
      </Button>
      <SignUp>
        <SignUpText onPress={() => setLogin(!login)}>
          Criar uma conta
        </SignUpText>
      </SignUp>
    </Container>
  ) : (
    <Container>
      <Title>
        Dev<Title style={TITLE_RED}>Post</Title>
      </Title>

      <Input placeholder="Seu nome" />
      <Input placeholder="seuemail@gmail.com" autoCapitalize="none" />
      <Input placeholder="******" secureTextEntry />

      <Button>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
      <SignUp>
        <SignUpText onPress={() => setLogin(!login)}>
          Já possuo uma conta
        </SignUpText>
      </SignUp>
    </Container>
  );
}

export default Auth;
