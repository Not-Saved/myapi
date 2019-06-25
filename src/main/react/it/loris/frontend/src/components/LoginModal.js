import React from 'react';
import { connect } from "react-redux";
import { Header, Icon, Message, Modal } from 'semantic-ui-react';

import LoginForm from './LoginForm';
import { login, refresh } from "../redux/actions/authAction";

class LoginModal extends React.Component {

    componentDidMount() {
        this.props.refresh();
    }

    render() {
        return (
            <Modal
                basic
                size="mini"
                open={!this.props.isSignedIn}
                closeOnEscape={false}
                closeOnDimmerClick={false}
            >
                <Modal.Content>
                    <Header
                        textAlign="left"
                        as={"h1"}
                        attached="top"
                        style={{backgroundColor: '#F8F8F9'}}
                    >
                        <Icon name='chess rook'/>
                        <Header.Content content="NotChess"/>
                    </Header>

                    <LoginForm
                        loading={this.props.isPending}
                        login={this.props.login}
                    />

                    {this.renderMessage()}
                </Modal.Content>
            </Modal>
        );
    }

    renderMessage() {
        const { isSignedIn, isFailed } = this.props;
        let content = '';

        if (isFailed) {
            content = "Something went wrong... try again!";
        } else if (isSignedIn) {
            content = "Login success!";
        } else {
            content = "Welcome!";
        }

        return <Message
            size= "large"
            attached="bottom"
            success={isSignedIn}
            error={isFailed}
            content={content}/>;
    }
}

const mapStateToProps = (state) => {
    const { isPending, isFailed, isSignedIn } = state.auth;
    return {
        isFailed: isFailed,
        isPending: isPending,
        isSignedIn: isSignedIn
    };
};

export default connect(mapStateToProps, { login, refresh })(LoginModal);