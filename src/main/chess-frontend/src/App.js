import React from 'react';
import { accessToken, refreshToken } from './api/notChessRequests';
import { Container } from 'semantic-ui-react';
import LoginForm from './components/LoginForm';


class App extends React.Component {
  state = {
    tokenObject: {},
    refreshToken: ''
  }

  toggleVisibility = () => this.setState(prevState => ({ visible: !prevState.visible }))

  render() {
    return (
      <Container
        style={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <LoginForm
          getToken={(username, password) => this.getToken(username, password)}
          refreshToken={() => refreshToken()}
        />
      </Container>
    );
  }

  async getToken(username, password) {
    const response = await accessToken(username, password);
    this.setState({ tokenObject: response.data });
    this.setState({ refreshToken: response.data.refresh_token })
    return response
  }

  async renewToken() {
    try {
      const response = await refreshToken(this.state.tokenObject.refresh_token);
      this.setState({ tokenObject: response.data });
    } catch (error) {
      this.setState({ tokenObject: error.response });
    } finally {
      console.log(this.state.tokenObject);
    }
  }
}

export default App;
