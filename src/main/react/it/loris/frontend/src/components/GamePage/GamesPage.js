import React, { Component } from 'react';
import { connect } from "react-redux";
import GamePageFeatures from "./GamePageFeatures";
import { Container, Header } from "semantic-ui-react";

class GamesPage extends Component {

    render() {
        return (
            <>
                <GamePageFeatures/>
                <Container style={{textAlign: 'center'}}>
                    {Object.values(this.props.game).map(game => <Header key={game.id}>{"Game: " +game.state+ " Date: " +new Date(game.createdAt).toLocaleDateString() +" Player: "+ game.players[0].username}</Header>)}
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