import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Icon, Menu, Responsive } from "semantic-ui-react";
import { logout } from "../redux/actions/authAction";

class MainMenu extends Component {
    state = { activeItem: this.props.location.pathname };

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({ activeItem: this.props.location.pathname });
        }
    }

    handleItemClick = (e, { name }) => {
        if (this.state.activeItem !== name) {
            this.setState({ activeItem: name });
            this.props.history.push(name);
        }
    };

    render() {
        const { activeItem } = this.state;
        return (
            <Menu
                pointing
                secondary
                widths={4}
            >
                <Menu.Item
                    name='/'
                    active={activeItem === '/'}
                    onClick={this.handleItemClick}
                    style={fontStyle}
                >
                    <Icon name='home' size='large'/>
                    <Responsive minWidth={600}>Home</Responsive>
                </Menu.Item>

                <Menu.Item
                    name='/games'
                    active={activeItem === '/games'}
                    onClick={this.handleItemClick}
                    style={fontStyle}
                >
                    <Icon name='list' size='large'/>
                    <Responsive minWidth={600}>Games</Responsive>
                </Menu.Item>

                <Menu.Item
                    name='/play'
                    active={activeItem === '/play' || activeItem === "/game/:id"}
                    onClick={this.handleItemClick}
                    style={fontStyle}
                >
                    <Icon name='play' size='large'/>
                    <Responsive minWidth={600}>Play</Responsive>
                </Menu.Item>

                <Menu.Item
                    onClick={this.props.logout}
                    style={fontStyle}
                >
                    <Icon name='sign-out' size='large'/>
                    <Responsive minWidth={600}>Logout</Responsive>
                </Menu.Item>
            </Menu>
        );
    }
}

export default connect(null, { logout })(withRouter(MainMenu));

const fontStyle = {
    fontSize: "19px",
    fontWeight: "bold"
};