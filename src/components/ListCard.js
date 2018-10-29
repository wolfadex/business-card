import React, { memo, useState, useEffect } from 'react';
import styled from 'react-emotion';
import { navigate } from '@reach/router';

const Card = styled('button')`
  padding: 1rem;
  font-size: 1.75rem;
  width: 32rem;
  text-align: left;
  border: none;

  @media (max-width: 450px) {
    width: 100vw;
  }
`;

export default memo(({ firestore, cardId, userId }) => {
  // Card data from the other user
  const [name, setName] = useState('');
  useEffect(
    () => {
      const unsubscribe = firestore
        .collection('users')
        .doc(cardId)
        .onSnapshot((doc) => {
          const { name: n = '' } = doc.data() || {};
          setName(n);
        });
      return () => {
        unsubscribe();
      };
    },
    [cardId],
  );

  return (
    <li>
      <Card
        onClick={() => {
          navigate(cardId);
        }}
      >
        {name}
      </Card>
    </li>
  );
});
