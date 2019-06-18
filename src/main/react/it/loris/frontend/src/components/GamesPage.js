import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Icon } from "semantic-ui-react";

import { fetchGames } from "../redux/actions";

class GamesPage extends Component {

    renderGamesPage(){
        this.props.fetchGames();
        return (
            <Container style={{marginTop: '13vh'}}>
                <Grid centered>
                    <Grid.Row>
                        <Header as='h1' style={{maxWidth: "75vw"}}>
                            This is where I'd put my games list...
                        </Header>
                    </Grid.Row>
                    <Grid.Row style={{position: 'relative', top: '25px'}}>
                        <Header as='h2' icon>
                            <Icon name='american sign language interpreting' style={{marginBottom: '20px'}}/>
                            <Header.Subheader>... if I had one!</Header.Subheader>
                        </Header>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

    render() {
        return this.props.isSignedIn ? this.renderGamesPage() : null;
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.games,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchGames})(GamesPage);