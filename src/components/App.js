import React, { memo, useState, useEffect, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Router, navigate } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'react-emotion';
import config from '../../config.json';
import ChirpConnect from './ChirpConnect';
import BusinessCards from './BusinessCards';
import Menu from './Menu';
import Profile from './Profile';
import BusinessCard from './BusinessCard';
import Header from './Header';

firebase.initializeApp(config.FIREBASE);

const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true,
});

const firebaseUiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const DataState = styled('div')`
  bottom: 2rem;
  font-size: 2rem;
  left: 2rem;
  pointer-events: none;
  position: absolute;
`;
const styledSVGIcon = css`
  path {
    color: #f98948;
  }
`;

export default memo(() => {
  // Authentication
  const [userData, setUserData] = useState(null);
  useEffect(
    () => {
      const unregisterAuthObserver = firebase
        .auth()
        .onAuthStateChanged(setUserData);

      return () => {
        unregisterAuthObserver();
      };
    },
    [false],
  );
  // Receiving a card from another user
  const [newCardId, setNewCardId] = useState(null);
  useEffect(
    () => {
      if (newCardId != null && newCardId !== '' && newCardId !== userData.uid) {
        const ref = firestore.collection('users').doc(userData.uid);

        ref
          .get()
          .then((doc) => {
            const { cards = [] } = doc.data();

            ref
              .set(
                { cards: Array.from(new Set([...cards, newCardId])) },
                { merge: true },
              )
              .catch((error) => {
                // TODO
                console.log('Error: Attempted to add card but failed:', error);
              });
          })
          .catch((error) => {
            // TODO;
            console.log('Error: Attempted to get cards but failed:', error);
          });
      }
    },
    [newCardId],
  );
  const [sending, setSending] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const [sent, setSent] = useState(false);
  const [received, setReceived] = useState(false);

  return (
    <div>
      {!userData && <Header>Business Card Manager</Header>}
      {!userData && (
        <StyledFirebaseAuth
          uiConfig={firebaseUiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
      {userData && (
        <>
          <ChirpConnect
            onReceived={(data) => {
              const string = new TextDecoder('utf-8').decode(data);
              setNewCardId(string);
              setReceiving(false);
              setReceived(true);
            }}
            onSending={() => {
              setSending(true);
              setSent(false);
            }}
            onReceiving={() => {
              setReceiving(true);
              setReceived(false);
            }}
            onSent={() => {
              setSending(false);
              setSent(true);
            }}
          >
            {({ initError, ready, send }) => (
              <>
                {initError && (
                  <span>
                    <b>Chirp Error: </b>
                    {initError}
                  </span>
                )}
                {ready && (
                  <>
                    <Menu
                      actions={[
                        {
                          id: 'profile',
                          onClick: () => {
                            navigate('/profile');
                          },
                          icon: 'address-card',
                        },
                        {
                          id: 'cards',
                          onClick: () => {
                            navigate('/');
                          },
                          icon: 'list',
                        },
                        {
                          id: 'sendCard',
                          onClick: () => {
                            send(userData.uid);
                          },
                          icon: 'broadcast-tower',
                        },
                      ]}
                      signOut={() => {
                        firebase.auth().signOut();
                      }}
                    />
                  </>
                )}
              </>
            )}
          </ChirpConnect>
          <Router>
            <BusinessCards
              path="/"
              firestore={firestore}
              userId={userData.uid}
            />
            <Profile
              path="profile"
              userId={userData.uid}
              firestore={firestore}
            />
            <BusinessCard
              path=":cardId"
              firestore={firestore}
              userId={userData.uid}
            />
          </Router>
        </>
      )}
      <DataState>
        {sending && (
          <FontAwesomeIcon icon="sync" spin className={styledSVGIcon} />
        )}
        {receiving && (
          <FontAwesomeIcon
            icon="sync"
            spin
            className={styledSVGIcon}
            flip="horizontal"
          />
        )}
      </DataState>
    </div>
  );
});
