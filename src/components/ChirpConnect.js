import React, { Component, Children } from 'react';
import config from '../../config.json';

const { Chirp } = ChirpConnectSDK;

export default class ChirpConnect extends Component {
  constructor(props) {
    super(props);

    this.sdk = null;
    this.state = {
      ready: false,
      initError: null,
      error: null,
      data: [],
      current: null,
      previous: null,
    };

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
        this.setState({
          ready: true,
        });
      })
      .catch((error) => {
        this.setState({
          initError: error,
        });
      });
  }

  render() {
    const { children } = this.props;

    // Children.only(children);

    return children({
      ...this.state,
      send: this.sdk && this.sdk.send,
    });
  }
}
