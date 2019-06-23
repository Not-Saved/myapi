import React, { useEffect } from 'react';

import { Checkbox, Dropdown, Header } from "semantic-ui-react";

function GameStateFilter(props) {

    useEffect(() => {
        props.setState(stateOptions[0].value);
    }, []);

    return (
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Dropdown
                disabled={props.disabled}
                floating
                pointing="top left"
                header={<Header style={{ fontSize: "14px" }} icon="chess" content="Show games:"/>}
                options={stateOptions}
                onChange={(e, { value }) => props.setState(value)}
                value={props.state}
                style={{ marginRight: "15%", fontSize: "18px", fontWeight: "bold" }}
            />
            <Checkbox
                disabled={props.disabled}
                label="My games"
                onChange={() => props.setMine(!props.mine)}
                style={{ fontSize: "18px", fontWeight: "bold" }}
            />
        </div>
    );
}

const stateOptions = [
    {
        key: 'all',
        text: 'All',
        value: 'ALL'
    },
    {
        key: 'newGames',
        text: 'New',
        value: 'NEW'
    },
    {
        key: 'gamesInProgress',
        text: 'In progress',
        value: 'IN_PROGRESS'
    },
    {
        key: 'completeGames',
        text: 'Complete',
        value: 'ENDED'
    }
];

export default GameStateFilter;