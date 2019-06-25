import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import GameStateFilter from './GameStateFilter';
import GameSearch from "./GameSearch";

import { fetchGame, fetchGames } from "../../redux/actions/gameAction";

function GameMainMenu(props) {
    const [searchValue, setSearchValue] = useState('');
    const [state, setState] = useState('');
    const [mine, setMine] = useState(false);

    useEffect(() => {
        if (searchValue.length) {
            props.fetchGame(searchValue);
        } else {
            const params = { state: state === 'ALL' ? null : state, mine: mine };
            props.fetchGames({ params: params });
        }
    }, [props, searchValue, state, mine]);


    return (
        <Grid columns={2} style={{marginTop: "-8px", marginBottom: "16px"}}>
            <Grid.Column style={{ minHeight: "100%" }} textAlign="left">
                <GameSearch searchValue={searchValue} setSearchValue={setSearchValue}/>
            </Grid.Column>
            <Grid.Column style={{ minHeight: "100%" }}textAlign="right">
                <GameStateFilter
                    disabled={searchValue.length !== 0}
                    state={state}
                    setState={setState}
                    mine={mine}
                    setMine={setMine}
                />
            </Grid.Column>
        </Grid>
    );
}

export default connect(null, { fetchGames, fetchGame })(GameMainMenu);