import React, { Component } from 'react';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchCurrentUser } from "../redux/actions";

class HomePage extends Component {

    renderPage() {
        return (
            <Container style={{marginTop: '13vh'}}>
                <Grid centered>
                    <Grid.Row>
                        <Header as='h1'>
                            Welcome back, {_.startCase(_.toLower(this.props.currentUser.username))}
                        </Header>
                    </Grid.Row>
                    <Grid.Row style={{position: 'relative', top: '25px'}}>
                        <Header as='h2' icon>
                            <Icon name='settings' style={{marginBottom: '20px'}}/>
                            Work in progress
                            <Header.Subheader>Come back in a few weeks</Header.Subheader>
                        </Header>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }

    render() {
        return this.props.currentUser ? this.renderPage() : null;
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUser: state.user.currentUser
    };
};

export default connect(mapStateToProps, {fetchCurrentUser})(HomePage);