import React, { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';

export default ({ firestore, userId }) => {
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
    <ul>
      <li>Cards go here</li>
      {cardIds.map((cardId) => (
        <BusinessCard
          key={cardId}
          cardId={cardId}
          userId={userId}
          firestore={firestore}
        />
      ))}
    </ul>
  );
};
