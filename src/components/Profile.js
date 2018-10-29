import React, { memo, useState, useEffect } from 'react';
import Header from './Header';

export default memo(({ userId, firestore }) => {
  const firebaseUpdate = changeValues(firestore, userId);
  const [name, setName] = useState('');
  const [details, setDetails] = useState([]);
  useEffect(
    () => {
      firestore
        .collection('users')
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const { name: n, details: d = [] } = doc.data();

            setName(n);
            setDetails(d);
          }
        })
        .catch((error) => {
          // TODO
        });
    },
    [userId],
  );

  return (
    <div>
      <Header>Profile</Header>
      <span>
        <b>Name: </b>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
          onBlur={() => {
            firebaseUpdate({ name });
          }}
        />
      </span>
      {/* {details.map(({ type, label, value }, index) => (
        <span key={index}>
          {type === 'Google' &&
            <>
              <b>Google: </b>
              <input
                type="text"
                value={value}
                onChange={({ target: { value } }) =>
                  setDetails(updateDetail(details, index, { value }))
                }
                onBlur={() => {
                  firebaseUpdate({
                    details,
                  });
                }}
              />
            </>
          }
          {type === 'Email' &&
            <>
              <b>Email: </b>
              <input
                type="text"
                value={value}
                onChange={({ target: { value } }) =>
                  setDetails(updateDetail(details, index, { value }))
                }
                onBlur={() => {
                  firebaseUpdate({
                    details,
                  });
                }}
              />
            </>
          }
        </span>
      ))} */}
    </div>
  );
});

function changeValues(firestore, userId) {
  return function(values) {
    firestore
      .collection('users')
      .doc(userId)
      .set(values, { merge: true })
      .catch((error) => {
        // TODO
      });
  };
}

function updateDetail(details, index, update) {
  return [
    ...details.slice(0, index),
    { ...details.slice(index, index + 1), ...update },
    ...details.slice(index + 1),
  ];
}
