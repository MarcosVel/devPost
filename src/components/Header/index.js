import React, { useContext } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../contexts/auth';
import { Container, Logout, Red, Title } from './styles';

export default function Header({ hasLogOut }) {
  const { signOut } = useContext(AuthContext);

  return (
    <Container>
      <Title>
        Dev<Red>Post</Red>
      </Title>
      {hasLogOut && (
        <Logout
          onPress={() => signOut()}
          hitSlop={{
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
          }}>
          <Feather name="log-out" size={20} color="#fff" />
        </Logout>
      )}
    </Container>
  );
}
