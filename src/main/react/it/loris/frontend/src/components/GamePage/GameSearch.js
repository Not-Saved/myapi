import React from 'react';
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";
import { fetchGame } from "../../redux/actions/gameAction";

function GameSearch(props) {

    const handleSearchValueChange = (e, { value }) => {
        if (/^\d+$/.test(value) || value.length === 0) {
            props.setSearchValue(value);
        }
    };

    return (
        <Input
            value={props.searchValue}
            onChange={handleSearchValueChange}

            icon="search"
            placeholder='Search game ID...'
            transparent
            style={{ height: "100%", width: "65%", fontSize: "18px" }}
        />
    );
}

export default connect(null, { fetchGame })(GameSearch);