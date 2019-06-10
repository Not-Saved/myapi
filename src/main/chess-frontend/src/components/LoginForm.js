import React from 'react';
import { Form, Message, Header, Icon, Input } from 'semantic-ui-react';
import { accessToken } from '../api/notChessRequests'

class LoginForm extends React.Component {
	state = {
		username: '', password: '',
		isLoading: false,
		message: { error: false, success: false, hidden: false, message: 'Welcome!' },
	}

	handleFieldChange = (e, { name, value }) => this.setState({ [name]: value })

	render() {
		const { username, password, isLoading, message } = this.state
		return (
			<div style={style}>
				<Header
					as='h2'
					attached='top'
					textAlign='left'
					style={{ backgroundColor: '#F8F8F9' }}
				>
					<Icon
						name='chess rook'
						style={{ fontSize: '42px' }}
					/>
					<Header.Content content="NotChess" />
				</Header>
				<Form
					className='attached fluid segment'
					loading={isLoading}
					onSubmit={() => this.handleSubmit()}
				>
					<Form.Field>
						<Input
							name='username'
							placeholder='Username'
							value={username}
							onChange={this.handleFieldChange}
						/>
					</Form.Field>
					<Form.Field>
						<Input
							name='password'
							placeholder='Password'
							value={password}
							onChange={this.handleFieldChange}
							type='password'
							action={{
								icon: { name: 'sign-in' },
								style: { backgroundColor: '#F8F8F9', border: '1px solid lightGray' }
							}}
						/>
					</Form.Field>
				</Form>
				<Message
					attached='bottom'
					content={message.message}
					hidden={message.hidden}
					success={message.success}
					error={message.error}
					style={{ textAlign: 'left' }} />
			</div>
		)
	}

	async handleSubmit() {
		const { username, password } = this.state
		this.setState({ isLoading: true })
		let response = null;
		try {
			response = await accessToken({ username, password })
			response = response.data
			this.setState({ message: { success: true, error: false, message: "Login success!" } })
		} catch (error) {
			this.setState({ message: { success: false, error: true, message: "Something went wrong... try again!" } })
		} finally {
			this.setState({ password: '' })
			this.setState({ isLoading: false })
			this.props.setToken(response)
		}
	}
}

const style = {
	width: '315px',
	textAlign: 'center',
	padding: '7px'
}

export default LoginForm;