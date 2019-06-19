import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Container, Grid, Header, Transition } from "semantic-ui-react";

import { fetchGames } from "../redux/actions";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

class PlayPage extends Component {
    state = {visible: false};

    toggleVisibility = () => this.setState({visible: true});

    render() {
        return (
            <Container style={{marginTop: '13vh'}}>
                <Grid centered>
                    <Grid.Row>
                        <Header as='h1' style={{maxWidth: "75vw"}}>
                            You know what sucks?
                        </Header>
                    </Grid.Row>
                    <Grid.Row style={{position: 'relative', top: '15px'}}>
                        <Header as='h2'>
                            <HeaderSubHeader content="What?" onClick={this.toggleVisibility}/>
                            <Transition visible={this.state.visible} animation='zoom' duration={2000}>
                                <Header icon>
                                    <Icon name="hand point down"/> Everything.
                                </Header>
                            </Transition>
                        </Header>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        games: state.games,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchGames})(PlayPage);