import React, { memo, useState, useEffect } from 'react';
import styled from 'react-emotion';
import ListCard from './ListCard';
import Header from './Header';

const List = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default memo(({ firestore, userId }) => {
  const [cardIds, setCardIds] = useState([]);
  useEffect(
    () => {
      const unsubscribe = firestore
        .collection('users')
        .doc(userId)
        .onSnapshot((doc) => {
          setCardIds(doc.data().cards || []);
        });
      return () => {
        unsubscribe();
      };
    },
    [userId],
  );

  return (
    <>
      <Header>Business Cards</Header>
      <List>
        {cardIds.length === 0 && <li>Time to collect some business cards!</li>}
        {cardIds.map((cardId) => (
          <ListCard
            key={cardId}
            cardId={cardId}
            userId={userId}
            firestore={firestore}
          />
        ))}
      </List>
    </>
  );
});
