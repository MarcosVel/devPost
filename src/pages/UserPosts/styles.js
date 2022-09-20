import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #36393f;
`;

export const ListPosts = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 24 },
})`
  flex: 1;
  padding-top: 8px;
`;
