import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {

    onSubmit = (formValues) => {
        const { reset } = this.props;
        this.props.login(formValues);
        reset();
    };

    render() {
        const { loading, handleSubmit } = this.props;
        return (
            <Form
                className='attached segment'
                loading={loading}
                onSubmit={handleSubmit(this.onSubmit)}
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
        );
    }

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
        );
    }
}

export default reduxForm({ form: 'loginForm' })(LoginForm);