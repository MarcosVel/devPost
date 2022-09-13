import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #36393f;
`;

export const ButtonPost = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  position: absolute;
  right: 5%;
  bottom: 5%;
  width: 60px;
  height: 60px;
  background-color: #202225;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;
