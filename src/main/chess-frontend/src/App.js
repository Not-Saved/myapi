import React from 'react';
import cookie from 'js-cookie'
import { Container, Menu } from 'semantic-ui-react';

import { refreshToken } from './api/notChessRequests';
import CenteredBasicModal from './components/CenteredBasicModal';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';

class App extends React.Component {
	state = { tokenObject: null }

	checkToken() { return (this.state.tokenObject === null) ? false : true }

	async componentDidMount() {
		try {
			const response = await refreshToken(cookie.get("refresh_token"));
			console.log("Logged in automatically!");
			this.setToken(response.data)
		} catch (error) {
			console.log("Could not login automatically.");
		}
	}

	renderHomePage() {
		if (this.checkToken()) {
			return (
				<HomePage tokenObject={this.state.tokenObject} />
			)
		}
	}

	render() {
		const { tokenObject } = this.state;
		return (
			<div>
				<CenteredBasicModal openToggle={() => !this.checkToken()}>
					<LoginForm
						setToken={(tokenObject) => this.setToken(tokenObject)}
						tokenObject={tokenObject}
					/>
				</CenteredBasicModal >

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
						<Menu.Item>
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

				{this.renderHomePage()}
			</div>
		);
	}

	setToken(tokenObject) {
		this.setState({ tokenObject: tokenObject });
		if (this.checkToken()) {
			console.log("Token got!");
			setTimeout(this.renewToken.bind(this), tokenObject.expires_in * 1000 - 10000);
			cookie.set("refresh_token", tokenObject.refresh_token, { expires: 7 });
		}
	}

	async renewToken() {
		const { tokenObject } = this.state;
		let response;
		try {
			response = await refreshToken(tokenObject.refresh_token);
			response = response.data;
		} catch (error) {
			response = null;
		}
		this.setToken(response);
	}

	logout() {
		this.setState({ tokenObject: null });
		cookie.remove("refresh_token")
	}
}

export default App;
