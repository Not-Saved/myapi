import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";

import { logout } from "../redux/actions";

function MainMenu(props) {
    const [activeItem, setActiveItem] = useState(props.location.pathname);

    const handleItemClick = (e, {name}) => {
        setActiveItem(name);
        props.history.push(name);
    };

    return (
        <Container style={style}>
            <Menu pointing secondary size={"huge"} widths={4}>
                <Menu.Item name='/' active={activeItem === '/'} onClick={handleItemClick}>
                    <Icon name='home' size='large'/>
                    {renderText("Home")}
                </Menu.Item>
                <Menu.Item name='/games' active={activeItem === '/games'} onClick={handleItemClick}>
                    <Icon name='list' size='large'/>
                    {renderText("Games")}
                </Menu.Item>
                <Menu.Item name='/play' active={activeItem === '/play'} onClick={handleItemClick}>
                    <Icon name='play' size='large'/>
                    {renderText("Play")}
                </Menu.Item>
                <Menu.Item onClick={props.logout}>
                    <Icon name='sign-out' size='large'/>
                    {renderText("Logout")}
                </Menu.Item>
            </Menu>
        </Container>
    );
}

function renderText(name) {
    return window.innerWidth > window.innerHeight ? name : '';
}

const style = {
    paddingTop: '1vh'
};

export default connect(null, {logout})(withRouter(MainMenu));