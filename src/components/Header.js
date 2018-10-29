import React from 'react';
import styled from 'react-emotion';

const Header = styled('div')`
  background-color: ${({ theme: { green } }) => green};
  display: grid;
  font-size: 1.9rem;
  grid-template-columns: 2rem auto;
  height: 4rem;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  width: 100%;
`;

const Content = styled('span')`
  align-items: center;
  color: ${({ theme: { primary } }) => primary};
  display: block;
  grid-column: 2;
  margin: auto 0;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
`;

export default ({ children }) => (
  <Header>
    <Content>{children}</Content>
  </Header>
);
