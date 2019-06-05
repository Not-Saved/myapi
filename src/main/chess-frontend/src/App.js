import React from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

function App() {
  const axiosCall = async () => {

    const params = {
      "grant_type": "password",
      "username": "loris",
      "password": "sirol"
    }

    const data = Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join('&');

    const response = await axios.request({
      url: process.env.REACT_APP_DOMAIN + 'api/oauth/token',
      method: 'post',
      auth: {
        username: "myClient",
        password: "secret"
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data
    }
    ).catch((error) => console.log(error.response))
    console.log(response.data)
  }
  axiosCall()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
