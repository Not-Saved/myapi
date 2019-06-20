import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Container, Icon, Menu, Responsive } from "semantic-ui-react";

import { logout } from "../redux/actions";

class MainMenu extends Component {
    state = {activeItem: this.props.location.pathname};

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name});
        if(this.state.activeItem !== name){
            this.props.history.push(name);
        }
    };

    render() {
        const {activeItem} = this.state;
        return (
            <Container style={style}>
                <Menu pointing secondary size={"huge"} widths={4}>
                    <Menu.Item name='/' active={activeItem === '/'} onClick={this.handleItemClick}>
                        <Icon name='home' size='large'/>
                        <Responsive minWidth={600}>Home</Responsive>
                    </Menu.Item>
                    <Menu.Item name='/games' active={activeItem === '/games'} onClick={this.handleItemClick}>
                        <Icon name='list' size='large'/>
                        <Responsive minWidth={600}>Games</Responsive>
                    </Menu.Item>
                    <Menu.Item name='/play' active={activeItem === '/play'} onClick={this.handleItemClick}>
                        <Icon name='play' size='large'/>
                        <Responsive minWidth={600}>Play</Responsive>
                    </Menu.Item>
                    <Menu.Item onClick={this.props.logout}>
                        <Icon name='sign-out' size='large'/>
                        <Responsive minWidth={600}>Logout</Responsive>
                    </Menu.Item>
                </Menu>
            </Container>
        );
    }
}


const style = {
    paddingTop: '1vh'
};

export default connect(null, {logout})(withRouter(MainMenu));