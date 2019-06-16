import React from 'react'
import { Container, Header, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
	render() {
		return (
			<Container
				style={{
					marginTop: '13vh'
				}}
			>
				<Grid centered>
					<Grid.Row  >
						<Header as='h1' >
							Welcome back
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
}

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

export default connect(mapStateToProps)(HomePage);