import React from 'react';
import { Button, Icon, Label, Responsive, Segment, Table } from "semantic-ui-react";
import _ from "lodash";
import { withRouter } from 'react-router-dom';

function GameCard({ game, history }) {
    return (
        <Segment
            piled
            onClick={() => history.push(`/game/${game.id}`)}
            style={{ padding: "0px" }}
        >
            <Table style={{ padding: "1px" }} compact='very' unstackable basic textAlign="center"
                   verticalAlign="middle">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2} style={cellStyle}>
                            <Icon fitted name="hashtag" size="big"/>
                        </Table.HeaderCell>
                        <Responsive as={Table.HeaderCell} minWidth={500} width={3} style={cellStyle}>
                            <Icon fitted name="calendar" size="big"/>
                        </Responsive>
                        <Table.HeaderCell width={2} style={cellStyle}>
                            <Icon fitted name="user outline" size="big"/>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={2} style={cellStyle}>
                            <Icon fitted name="user" size="big"/>
                        </Table.HeaderCell>
                        <Responsive as={Table.HeaderCell} minWidth={500} width={1} style={cellStyle}>
                            <Icon fitted name={findTurnIcon(game)} size="big"/>
                        </Responsive>
                    </Table.Row>
                </Table.Header>
                <Table.Body style={{ fontSize: "16px", fontWeight: "bold" }}>
                    <Table.Row>
                        <Table.Cell>
                            {game.id}
                        </Table.Cell>
                        <Responsive as={Table.Cell} minWidth={500}>
                            {new Date(game.createdAt).toLocaleDateString()}
                        </Responsive>
                        <Table.Cell>
                            {findPlayer(game.players, "WHITE")}
                        </Table.Cell>
                        <Table.Cell>
                            {findPlayer(game.players, "BLACK")}
                        </Table.Cell>
                        <Responsive as={Table.Cell} minWidth={500}>
                            {game.turn}
                        </Responsive>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    );
}

const cellStyle = {
    border: "0px",
    paddingBottom: "5px"
};

const findTurnIcon = (game) => {
    switch (game.state) {
        case "ENDED":
            return "hourglass end";
        case "IN_PROGRESS":
            return "hourglass half";
        default:
            return "hourglass start";
    }
};

const findPlayer = (players, color) => {
    if (players.filter(player => player.color === color)[0]) {
        return (
            <Label style={{ height: "30px", margin: "0px", fontSize: "14px", fontWeight: "bold" }}>
                {_.startCase(_.toLower(players.filter(player => player.color === color)[0].username))}
            </Label>
        );
    } else {
        return (
            <Button compact size="small" basic
                    style={{ height: "30px", margin: "0px", fontSize: "14px", fontWeight: "bold" }} icon="plus"
                    content="Join"/>
        );
    }
};

export default withRouter(GameCard);