import React from 'react';
import { Modal } from 'semantic-ui-react';
import LoginForm from './LoginForm';

class CenteredBasicModal extends React.Component {
    render() {
        return (
            <Modal
                basic
                open={this.props.open}
                closeOnEscape={false}
                closeOnDimmerClick={false}
            >
                <Modal.Content style={style}>
                    <LoginForm/>
                </Modal.Content>
            </Modal>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
};

export default CenteredBasicModal;