import React, { Component } from 'react';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchCurrentUser } from "../redux/actions/userAction";

class HomePage extends Component {

    render() {
        return (
            <Container style={{marginTop: '13vh'}}>
                <Grid centered>
                    <Grid.Row>
                        <Header as='h1'>
                            Welcome back, {this.props.currentUser && _.startCase(_.toLower(this.props.currentUser.username))}
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
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        currentUser: state.user.currentUser
    };
};

export default connect(mapStateToProps, {fetchCurrentUser})(HomePage);