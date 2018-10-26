import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import config from '../config.json';

const { Chirp } = ChirpConnectSDK;

const rootElement = document.getElementById('root');

class Chirper extends Component {
  constructor(props) {
    super(props);

    this.state = { ready: false };
    this.sdk = null;

    Chirp({
      key: config.CHIRP_KEY,
      onStateChanged: (previous, current) => {
        this.setState({
          current,
          previous,
        });
      },
      onReceived: (data) => {
        this.setState({
          error: data.length === 0,
          data,
        });
      },
    })
      .then((sdk) => {
        this.sdk = sdk;
        console.log('carl - 1', sdk);
        console.log('carl - 2', this.sdk);
        this.setState({
          ready: true,
        });
      })
      .catch((error) => {
        this.setState({
          chirpError: error,
        });
      });
  }

  render() {
    const { current, previous, error, data, ready, chirpError } = this.state;

    return (
      <div>
        <button onClick={this.doChirp}>Chirp</button>
        <span>
          <b>Chirp Error: </b>
          {chirpError}
        </span>
        {ready && (
          <Fragment>
            <span>
              <b>Current: </b>
              {current}
            </span>
            <span>
              <b>Previous: </b>
              {previous}
            </span>
            <span>
              <b>Error: </b>
              {error}
            </span>
            <span>
              <b>Data: </b>
              {data}
            </span>
          </Fragment>
        )}
      </div>
    );
  }

  doChirp = () => {
    this.sdk.send([0, 1, 2, 3]);
  };
}

render(<Chirper />, rootElement);
