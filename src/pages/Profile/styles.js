import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #353840;
`;

export const UploadButton = styled.TouchableOpacity`
  margin-top: 24px;
  overflow: hidden;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border-width: 2px;
  border-color: #fff;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Name = styled.Text`
  margin-top: 16px;
  font-size: 28px;
  font-weight: bold;
  color: #fafafa;
`;

export const Email = styled.Text`
  margin-top: 8px;
  font-size: 18px;
  font-style: italic;
  color: #fafafa;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 8px 16px;
  width: 80%;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #fafafa;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fafafa;
`;

export const Background = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContainer = styled.KeyboardAvoidingView`
  width: 100%;
  height: 50%;
  background-color: #202225;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 32px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
})`
  width: 100%;
  background-color: #101012;
  border-radius: 8px;
  padding: 8px 16px;
  color: #fafafa;
  font-size: 16px;
`;

export const SaveButton = styled.TouchableOpacity`
  margin-top: 24px;
  width: 100%;
  border-radius: 8px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #fafafa;
`;

export const SaveText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fafafa;
`;
