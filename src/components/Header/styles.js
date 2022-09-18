import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  width: 100%;
  background-color: #353840;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #c7c7c7;
`;

export const Title = styled.Text`
  font-size: 27px;
  font-weight: bold;
  padding-bottom: 16px;
  color: #fff;
`;

export const Red = styled(Title)`
  font-style: italic;
  color: #e52246;
`;
