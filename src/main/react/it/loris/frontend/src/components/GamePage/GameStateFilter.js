import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { fetchGames } from "../../redux/actions";
import { Checkbox, Dropdown, Grid, Header } from "semantic-ui-react";

function GameStateFilter(props) {
    const [ state, setState ] = useState(stateOptions[0].value);
    const [ mine, setMine ] = useState(false);

    useEffect(() => {
        const params = { state: state === 'ALL' ? null : state, mine: mine };
        props.fetchGames({
            params: params
        });
    }, [ props, state, mine ]);

    return (
        <Grid doubling columns={3} verticalAlign="middle">
            <Grid.Column>
                <Dropdown
                    floating
                    pointing="top"
                    header={<Header icon="chess board" content="Show games:"/>}
                    options={stateOptions}
                    onChange={(e, { value }) => setState(value)}
                    value={state}
                />
            </Grid.Column>
            <Grid.Column>
                <Checkbox
                    label="My games"
                    onChange={() => setMine(!mine)}
                    style={{ fontSize: '16px' }}
                />
            </Grid.Column>
        </Grid>
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

export default connect(null, { fetchGames })(GameStateFilter);