import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 8px 16px 0;
  background-color: #353840;
  flex: 1;
`;

export const InputArea = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #262626;
  padding: 0 16px;
  border-radius: 8px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
})`
  flex: 1;
  margin-left: 8px;
  color: #fff;
  font-size: 16px;
`;

export const List = styled.FlatList``;
