import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import CenteredBasicModal from './CenteredBasicModal';
import HomePage from './HomePage';
import history from '../history';
import MainMenu from "./MainMenu";
import GamesPage from "./GamePage/GamesPage";
import PlayPage from "./PlayPage";
import PrivateRoute from "../PrivateRoute";

import { refresh } from "../redux/actions";

class App extends React.Component {

    componentDidMount() {
        this.props.refresh();
    }

    render() {
        const { isSignedIn } = this.props;
        return (
            <Router history={history}>
                <CenteredBasicModal open={!isSignedIn}/>
                <MainMenu/>
                <Switch>
                    <PrivateRoute isSignedIn={isSignedIn} path="/" exact component={HomePage}/>
                    <PrivateRoute isSignedIn={isSignedIn} path="/games" exact component={GamesPage}/>
                    <PrivateRoute isSignedIn={isSignedIn} path="/play" exact component={PlayPage}/>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    const { isSignedIn, tokenObject } = state.auth;
    return {
        isSignedIn: isSignedIn,
        tokenObject: tokenObject
    };
};

export default connect(mapStateToProps, { refresh })(App);
