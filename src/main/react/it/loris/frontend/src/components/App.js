import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import CenteredBasicModal from './CenteredBasicModal';
import HomePage from './HomePage';
import history from '../history';
import MainMenu from "./MainMenu";
import GamesPage from "./GamesPage";
import PlayPage from "./PlayPage";

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <CenteredBasicModal open={!this.props.isSignedIn}/>
                <MainMenu/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/games" exact component={GamesPage}/>
                    <Route path="/play" exact component={PlayPage}/>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    const {isSignedIn, tokenObject} = state.auth;
    return {
        isSignedIn: isSignedIn,
        tokenObject: tokenObject
    };
};

export default connect(mapStateToProps)(App);
