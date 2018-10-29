import React, { useState, useEffect } from 'react';
import styled from 'react-emotion';

const Card = styled('li')``;

export default ({ firestore, cardId, userId }) => {
  // Card data from the other user
  const [cardData, setCardData] = useState(null);
  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(cardId)
      .onSnapshot((doc) => {
        setCardData(doc.data());
      });
    return () => {
      unsubscribe();
    };
  });
  // Personal notes about the card data
  const [cardNotes, setCardNotes] = useState('');
  useEffect(() => {
    const unsubscribe = firestore
      .collection('users')
      .doc(userId)
      .collection('notes')
      .doc(cardId)
      .onSnapshot((doc) => {
        setCardNotes(doc.data());
      });
    return () => {
      unsubscribe();
    };
  });

  return (
    <Card>
      <b>Contact Info:</b>
      <b />
      <span>Card Data Here</span>
      <b />
      <b>Notes:</b>
      <b />
      <p>{cardNotes}</p>
    </Card>
  );
};
