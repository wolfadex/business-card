import React, { memo, useState, useEffect } from 'react';
import styled from 'react-emotion';
import Header from './Header';

const Card = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 450px) {
    width: 100vw;
  }
`;

export default memo(({ firestore, cardId, userId }) => {
  // Card data from the other user
  const [cardData, setCardData] = useState({});
  useEffect(
    () => {
      const unsubscribe = firestore
        .collection('users')
        .doc(cardId)
        .onSnapshot((doc) => {
          setCardData(doc.data() || {});
        });
      return () => {
        unsubscribe();
      };
    },
    [cardId],
  );
  // Personal notes about the card data
  const [cardNotes, setCardNotes] = useState('');
  useEffect(
    () => {
      console.log('carl - 3');
      const unsubscribe = firestore
        .collection('users')
        .doc(userId)
        .collection('notes')
        .doc(cardId)
        .onSnapshot((doc) => {
          console.log('carl - 4');
          setCardNotes(doc.data());
        });
      return () => {
        unsubscribe();
      };
    },
    [userId, cardId],
  );

  const { name } = cardData;

  return (
    <Card>
      <Header>{name}</Header>
      <span>
        <b>Phone: </b>
      </span>
      <span>
        <b>Address: </b>
      </span>
      <span>
        <b>Email: </b>
      </span>
    </Card>
  );
});
