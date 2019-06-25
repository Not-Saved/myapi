import React from 'react';
import { Button, Icon, Label, Segment, Table } from "semantic-ui-react";
import _ from "lodash";
import { withRouter } from 'react-router-dom';

function GameCard({ game, history }) {

    const renderPlayer = (players, color) => {
        if (players.filter(player => player.color === color)[0]) {
            return (
                <Label style={{ height: "30px", margin: "0px", fontSize: "14px", fontWeight: "bold" }}>
                    {_.startCase(_.toLower(players.filter(player => player.color === color)[0].username))}
                </Label>
            );
        } else {
            return (
                <Button
                    basic
                    compact
                    size="small"
                    icon="plus"
                    content="Join"
                    onClick={(e) => {
                        history.push(`/game/${game.id}`);
                        e.stopPropagation();
                    }}
                    style={{ height: "30px", margin: "0px", fontSize: "14px", fontWeight: "bold" }}
                />
            );
        }
    };

    return (
        <Segment
            piled
            style={{ padding: "6px" }}
        >
            <Table
                unstackable
                basic
                compact='very'
                textAlign="center"
                verticalAlign="middle"
                style={{ border: "0px" }}
                onClick={() => history.push("/")}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1} style={headerCellStyle}>
                            <Icon fitted name="hashtag" size="big"/>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={3} style={headerCellStyle}>
                            <Icon fitted name="calendar" size="big"/>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} style={headerCellStyle}>
                            <Icon fitted name="user outline" size="big"/>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} style={headerCellStyle}>
                            <Icon fitted name="user" size="big"/>
                        </Table.HeaderCell>
                        <Table.HeaderCell width={1} style={headerCellStyle}>
                            <Icon fitted name={findTurnIcon(game)} size="big"/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body style={{ fontSize: "16px", fontWeight: "bold" }}>
                    <Table.Row>
                        <Table.Cell>
                            {game.id}
                        </Table.Cell>
                        <Table.Cell>
                            {new Date(game.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell style={{ minWidth: "105px" }}>
                            {renderPlayer(game.players, "WHITE")}
                        </Table.Cell>
                        <Table.Cell style={{ minWidth: "105px" }}>
                            {renderPlayer(game.players, "BLACK")}
                        </Table.Cell>
                        <Table.Cell>
                            {game.turn}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Segment>
    );
}

const headerCellStyle = {
    border: "0px",
    paddingBottom: "5px",
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

export default withRouter(GameCard);