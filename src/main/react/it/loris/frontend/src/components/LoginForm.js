import React from 'react';
import { Form, Message, Header, Icon, Input } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { login } from '../redux/actions';

class LoginForm extends React.Component {
	renderInput({ input, label }) {
		return (
			<Input
				{...input}
				placeholder={label}
				type={label}
				action={label === "password" && {
					icon: { name: 'sign-in' },
					style: { backgroundColor: '#F8F8F9', border: '1px solid lightGray' }
				}}
			/>
		)
	}

	onSubmit = (formValues) => {
		const { reset } = this.props;
		this.props.login(formValues);
		reset()
	};

	render() {
		return (
			<div style={style}>
				{this.renderHeader()}
				<Form
					loading={this.props.isPending}
					className='attached fluid segment'
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>
					<Form.Field>
						<Field
							name="username"
							component={this.renderInput}
							label="username"
						/>
					</Form.Field>
					<Form.Field>
						<Field
							name="password"
							component={this.renderInput}
							label="password"
						/>
					</Form.Field>
				</Form>
				{this.renderMessage()}
			</div>
		)
	}

	renderMessage() {
		const { isSignedIn, isFailed } = this.props
		const messageText = this.messageText()
		return (
			<Message
				attached='bottom'
				content={messageText}
				success={isSignedIn}
				error={isFailed}
				style={{ textAlign: 'left' }
				}
			/>
		)
	}

	messageText() {
		const { isSignedIn, isFailed } = this.props
		if (isFailed) {
			return "Something went wrong... try again!"
		} else if (isSignedIn) {
			return "Login success!"
		} else {
			return "Welcome!"
		}
	}

	renderHeader() {
		return (
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
		)
	}
}

const style = {
	width: '315px',
	textAlign: 'center',
	padding: '7px'
}

const mapStateToProps = (state) => {
	const { isPending, isFailed, isSignedIn } = state.auth
	return {
		isFailed: isFailed,
		isPending: isPending,
		isSignedIn: isSignedIn
	}
}

const formWrapped = reduxForm({
	form: 'loginForm'
})(LoginForm);

export default connect(
	mapStateToProps,
	{ login }
)(formWrapped);




