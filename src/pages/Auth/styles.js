import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #36393f;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 56px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 16px;
`;

export const TITLE_RED = {
  color: '#e52246',
};

export const Input = styled.TextInput`
  width: 80%;
  background-color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
`;

export const PasswordInput = styled.View`
  flex-direction: row;
  margin-top: 8px;
  width: 80%;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
`;

export const TogglePassword = styled.TouchableOpacity`
  margin-right: 16px;
`;

export const Button = styled.TouchableOpacity`
  width: 80%;
  background-color: #418cfd;
  margin-top: 16px;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const SignUp = styled.TouchableOpacity`
  width: 80%;
  margin-top: 4px;
  padding: 8px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const SignUpText = styled.Text`
  font-size: 16px;
  color: #dcdcdc;
`;
