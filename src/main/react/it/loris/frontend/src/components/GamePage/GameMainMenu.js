import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Grid, Responsive } from "semantic-ui-react";
import GameStateFilter from './GameStateFilter';
import GameSearch from "./GameSearch";

import { fetchGame, fetchGames } from "../../redux/actions/gameAction";

function GameMainMenu(props) {
    const [columns, setColumns] = useState(window.innerWidth < 500 ? 1 : 2);
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
    }, [props, state, mine, searchValue]);

    const handleSizeChange = () => {
        setColumns(window.innerWidth < 500 ? 1 : 2);
    };

    return (
        <Responsive
            as={Grid} fireOnMount onUpdate={handleSizeChange}
            textAlign="center"
            columns={columns}
            style={{ marginTop: "16px" }}
        >

            <Responsive
                as={Grid.Column} minWidth={500}
                verticalAlign="middle" style={{ height: "30px", padding: "0px" }}
            >
                <GameSearch searchValue={searchValue} setSearchValue={(value) => setSearchValue(value)}/>
            </Responsive>

            <Grid.Column verticalAlign="middle" style={{ height: "30px", padding: "0px" }}>
                <GameStateFilter
                    disabled={searchValue.length !== 0}
                    state={state}
                    setState={setState}
                    mine={mine}
                    setMine={setMine}
                />
            </Grid.Column>
        </Responsive>
    );
}

export default connect(null, { fetchGames, fetchGame })(GameMainMenu);