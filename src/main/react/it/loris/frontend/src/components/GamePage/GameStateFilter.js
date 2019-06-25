import React, { useEffect } from 'react';

import { Checkbox, Dropdown, Grid, Header } from "semantic-ui-react";

function GameStateFilter(props) {
    useEffect(() => {
        props.setState(stateOptions[0].value);
    }, []);

    return (
        <Grid columns={2}>
            <Grid.Column>
                <Dropdown
                    disabled={props.disabled}
                    floating
                    pointing="top left"
                    header={<Header icon="chess" content="Show games:"/>}
                    options={stateOptions}
                    onChange={(e, { value }) => props.setState(value)}
                    value={props.state}

                    style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
                />
            </Grid.Column>
            <Grid.Column>
                <Checkbox
                    label="My games"
                    disabled={props.disabled}
                    onChange={() => props.setMine(!props.mine)}

                    style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
                />
            </Grid.Column>
        </Grid>
    );
}

export default GameStateFilter;

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

