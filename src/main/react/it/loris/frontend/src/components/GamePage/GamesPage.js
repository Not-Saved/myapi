import React, { Component } from 'react';
import { connect } from "react-redux";
import GameMainMenu from "./GameMainMenu";
import { Container } from "semantic-ui-react";
import GameList from "./GameList";

class GamesPage extends Component {

    render() {
        return (
            <>
                <Container textAlign="center" text>
                    <GameMainMenu/>
                    <GameList/>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps)(GamesPage);