import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  width: 100%;
  flex-direction: row;
  background-color: #353840;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7c7;
  padding-bottom: 16px;
  z-index: 1;
`;

export const Title = styled.Text`
  font-size: 27px;
  font-weight: bold;
  color: #fff;
`;

export const Red = styled(Title)`
  font-style: italic;
  color: #e52246;
`;

export const Logout = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 24px;
`;
