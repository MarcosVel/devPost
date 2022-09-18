import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #202225;
  margin: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(100, 100, 100, 0.5);
  elevation: 3;
  padding: 12px;
`;

export const Header = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  margin-right: 8px;
`;

export const Name = styled.Text`
  color: #fafafa;
  font-weight: bold;
  font-size: 16px;
`;

export const Content = styled.Text`
  color: #fafafa;
`;

export const Actions = styled.View`
  margin-top: 16px;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;

export const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const Like = styled.Text`
  color: #aaa;
  margin-left: 8px;
`;

export const TimePost = styled.Text`
  color: #aaa;
`;
