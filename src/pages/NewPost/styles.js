import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #36393f;
`;

export const Input = styled.TextInput.attrs({
  multiline: true,
  placeholderTextColor: '#ccc',
  maxLength: 250,
})`
  margin: 8px;
  color: #fff;
  font-size: 20px;
`;

export const CharacterCounter = styled.Text`
  color: #ccc;
  margin-right: 8px;
  align-self: flex-end;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 8px 24px;
  background-color: #fff;
  border-radius: 30px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
