import React, { useState } from 'react';
import { Grid, Responsive } from "semantic-ui-react";
import GamePageMainMenuLeft from './GameStateFilter';
import GameSearchCreate from "./GameSearchCreate";

function GamePageFeatures() {
    const [ width, setWidth ] = useState(window.innerWidth < 600 ? 1 : 2);
    const [ textAlign, setTextAlign ] = useState(window.innerWidth < 600 ? "center" : "left");

    const handleChange = () => {
        setWidth(window.innerWidth < 600 ? 1 : 2);
        setTextAlign(window.innerWidth < 600 ? "center" : "left");
    };

    return (
        <Responsive
            as={Grid} container columns={width}
            fireOnMount onUpdate={handleChange}
            style={{ fontSize: '16px', marginTop: '-7px', padding: '10px' }}
        >
            <Responsive as={Grid.Column} textAlign={textAlign}>
                <GamePageMainMenuLeft/>
            </Responsive>

            <Responsive as={Grid.Column} minWidth={600} textAlign={"right"}>
                <GameSearchCreate/>
            </Responsive>
        </Responsive>
    );
}

export default GamePageFeatures;