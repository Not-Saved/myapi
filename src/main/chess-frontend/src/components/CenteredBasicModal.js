import React from 'react';
import { Modal } from 'semantic-ui-react';

const CenteredBasicModal = ({ openToggle, children }) => {
	return (
		<Modal
			basic
			open={openToggle()}
			closeOnEscape={false}
			closeOnDimmerClick={false}
		>
			<Modal.Content style={style}>
				{children}
			</Modal.Content>
		</Modal >
	)
}

const style = {
	display: 'flex',
	justifyContent: 'center'
}

export default CenteredBasicModal;