import React from 'react';
import { Form, Message, Header, Icon, Input } from 'semantic-ui-react';

class LoginForm extends React.Component {
	state = {
		username: '',
		password: '',
		loading: false,
		error: { hidden: true, message: '' },
		success: { hidden: true, message: '' }
	}


	handleChange = (e, { name, value }) => this.setState({ [name]: value })

	async handleSubmit() {
		const { username, password } = this.state
		try {
			this.setState({ loading: true })
			await this.props.getToken(username, password)
			this.setState({ error: { hidden: true } })
			this.setState({ success: { hidden: false, message: "Login success!" } })
		} catch (error) {
			this.setState({ success: { hidden: true } })
			this.setState({ error: { hidden: false, message: "Something went wrong... try again!" } })
		} finally {
			this.setState({ password: '' })
			this.setState({ loading: false })
		}
	}

	render() {
		const { username, password, loading, error, success } = this.state
		return (
			<div style={{
				width: '315px',
				textAlign: 'center',
				padding: '7px'
			}}
			>
				<Header as='h2' textAlign='left' attached='top'>
					<Icon name='chess rook' style={{ fontSize: '52px' }} />
					<Header.Content>
						NotChess
						<Header.Subheader>
							Welcome
							</Header.Subheader>
					</Header.Content>
				</Header>

				<Form className='attached fluid segment'
					loading={loading}
					onSubmit={() => this.handleSubmit()}
				>
					<Form.Field>
						<Input
							name='username'
							value={username}
							onChange={this.handleChange}
							placeholder='Username'
						/>
					</Form.Field>
					<Form.Field>
						<Input
							type='password'
							name='password'
							value={password}
							onChange={this.handleChange}
							placeholder='Password'
							action={{ icon: { name: 'sign-in', size: 'large' } }}
							labelPosition='right' />
					</Form.Field>
				</Form>
				<Message attached='bottom'
					error
					hidden={error.hidden}
					content={error.message} />
				<Message attached='bottom'
					hidden={success.hidden}
					success
					content={success.message} />
			</div>
		)
	}
}

export default LoginForm;