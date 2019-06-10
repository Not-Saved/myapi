import React from 'react'
import { Container, Header, Grid, Icon } from 'semantic-ui-react';
import { notChessReq } from '../api/notChessRequests';

class HomePage extends React.Component {
	state = {
		currentUser: {}
	}

	componentDidMount() {
		this.getCurrentUser();
	}

	render() {
		const { currentUser } = this.state
		return (

			<Container
				style={{
					marginTop: '13vh'
				}}
			>
				<Grid centered>
					<Grid.Row  >
						<Header as='h1' >
							Welcome back, {String(currentUser.username).charAt(0).toUpperCase() + String(currentUser.username).slice(1)}
						</Header>
					</Grid.Row>
					<Grid.Row style={{ position: 'relative', top: '30px' }}>
						<Header as='h2' icon>
							<Icon name='settings' style={{ marginBottom: '20px' }} />
							Work in progress
    					<Header.Subheader>Check back in a few weeks</Header.Subheader>
						</Header>
					</Grid.Row>
				</Grid>
			</Container >


		)
	}

	async getCurrentUser() {
		const response = await notChessReq.request({
			url: '/user/me',
			headers: {
				authorization: 'Bearer ' + this.props.tokenObject.access_token
			}
		})
		this.setState({ currentUser: response.data });
	}
}


export default HomePage;