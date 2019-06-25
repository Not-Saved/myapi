import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch } from 'react-router-dom';

import { Container } from "semantic-ui-react";

import LoginModal from './LoginModal';
import HomePage from './HomePage';
import history from '../history';
import MainMenu from "./MainMenu";
import GamesPage from "./GamePage/GamesPage";
import PlayPage from "./PlayPage";
import PrivateRoute from "../PrivateRoute";

class App extends React.Component {
    render() {
        const { isSignedIn } = this.props;
        return (
            <Container>
                <Router history={history}>
                    <LoginModal/>
                    <MainMenu/>
                    <Switch>
                        <PrivateRoute isSignedIn={isSignedIn} path="/" exact component={HomePage}/>
                        <PrivateRoute isSignedIn={isSignedIn} path="/games" exact component={GamesPage}/>
                        <PrivateRoute isSignedIn={isSignedIn} path="/play" exact component={PlayPage}/>
                    </Switch>
                </Router>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps)(App);