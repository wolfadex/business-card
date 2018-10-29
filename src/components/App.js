import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Router, navigate } from '@reach/router';
import config from '../../config.json';
import ChirpConnect from './ChirpConnect';
import BusinessCards from './BusinessCards';
import Menu from './Menu';
import Profile from './Profile';

firebase.initializeApp(config.FIREBASE);

const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true,
});

const firebaseUiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export default () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(setUserData);

    return () => {
      unregisterAuthObserver();
    };
  });

  return (
    <div>
      {!userData && (
        <StyledFirebaseAuth
          uiConfig={firebaseUiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
      {userData && (
        <>
          <ChirpConnect>
            {({ initError, ready, current, previous, error, data, send }) => (
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
            <div path=":cardId">Specific card data</div>
          </Router>
        </>
      )}
    </div>
  );
};
