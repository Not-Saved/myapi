import React from 'react';
import { Button, Input } from "semantic-ui-react";

function GameSearchCreate() {
    return (
        <>
            <Input
                focus
                transparent
                icon='search'
                placeholder='Search game...'
                style={{ marginRight: "15px", width: "135px" }}
            />
            <Button
                icon="plus"
                basic
                size="tiny"/>
        </>
    );
}

export default GameSearchCreate;