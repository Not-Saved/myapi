import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../redux/actions';

import CenteredBasicModal from './CenteredBasicModal';
import HomePage from './HomePage';
import history from '../history';
import { notChessReq } from '../api/notChessRequests';

class App extends React.Component {

	renderMenu() {
		return (
			<Container
				style={{
					display: 'flex',
					justifyContent: 'center',
					paddingTop: '2vh'
				}}>
				<Menu pointing secondary size={"huge"} widths={4}>
					<Menu.Item onClick={() => this.logout()}>
						This
						</Menu.Item>
					<Menu.Item onClick={() => notChessReq().get('user/me')}>
						doesn't
						</Menu.Item>
					<Menu.Item>
						work
						</Menu.Item>
					<Menu.Item>
						yet
						</Menu.Item>
				</Menu>
			</Container>
		)
	}

	render() {
		return (
			<Router history={history}>
				<CenteredBasicModal open={!this.props.isSignedIn} />
				{this.renderMenu()}
				<Switch>
					<Route path="/" exact component={HomePage} />
				</Switch>
			</Router>
		);
	}

	logout() {
		this.props.logout()
	}
}

const mapStateToProps = (state) => {
	const { isSignedIn, tokenObject } = state.auth
	return {
		isSignedIn: isSignedIn,
		tokenObject: tokenObject
	};
};

export default connect(mapStateToProps, { logout })(App);
