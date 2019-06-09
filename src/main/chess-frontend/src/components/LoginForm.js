import React from 'react';
import { Form, Message, Header, Icon, Input } from 'semantic-ui-react';

class LoginForm extends React.Component {
	state = {
		username: '',
		password: '',
		loading: false,
		error: { hidden: true, message: '' },
		success: { hidden: true, message: '' },
		info: { hidden: false, message: 'Welcome!' },
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
			this.setState({ info: { hidden: true } })
			this.setState({ password: '' })
			this.setState({ loading: false })
		}
	}

	render() {
		const { username, password, loading, error, info, success } = this.state
		return (
			<div style={{
				width: '315px',
				textAlign: 'center',
				padding: '7px'
			}}
			>
				<Header as='h2' textAlign='left' attached='top' style={{ backgroundColor: '#F8F8F9' }}>
					<Icon name='chess rook' style={{ fontSize: '42px' }} />
					<Header.Content>
						NotChess

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
							action={{ icon: { name: 'sign-in' }, style: { backgroundColor: '#F8F8F9', border: '1px solid lightGray' } }}
						/>
					</Form.Field>
				</Form>
				<Message attached='bottom'
					style={{ textAlign: 'left' }}
					hidden={info.hidden}
					content={info.message} />
				<Message attached='bottom'
					error
					hidden={error.hidden}
					content={error.message} />
				<Message attached='bottom'
					success
					hidden={success.hidden}
					content={success.message} />
			</div>
		)
	}
}

export default LoginForm;