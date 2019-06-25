import React, { Component } from 'react';
import { connect } from "react-redux";
import { Icon, Pagination, Segment, Header } from "semantic-ui-react";
import GameCard from "./GameCard";

class GameList extends Component {
    state = {
        activePage: 1,
        pageSize: 7
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const gamesArray = Object.values(this.props.games);
        if (this.state.activePage > Math.ceil(gamesArray.length / this.state.pageSize) && gamesArray[0]) {
            this.setState({ activePage: 1 });
        }
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage });
    };

    render() {
        const gamesArray = Object.values(this.props.games);
        if (this.props.games && gamesArray[0]) {
            return (
                <>
                    <div style={{height: "79vh"}}>
                        <Segment.Group>
                            {this.renderGameCards(gamesArray)}
                        </Segment.Group>
                    </div>
                    {this.renderPagination(gamesArray)}

                </>
            );
        } else {
            return null;
        }
    }

    renderGameCards = (gamesArray) => {
        const { activePage, pageSize } = this.state;
        return gamesArray
            .reverse()
            .slice((activePage - 1) * pageSize, pageSize + ((activePage - 1) * pageSize))
            .map((game) => <GameCard key={game.id} game={game}/>);
    };

    renderPagination = (gamesArray) => {
        const pages = Math.ceil(gamesArray.length / this.state.pageSize);
        if (pages > 1) {
            return (
                <Pagination
                    pointing
                    secondary
                    activePage={this.state.activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={pages}
                    firstItem={{ content: <Icon size="large" name='angle double left'/>, icon: true }}
                    lastItem={{ content: <Icon size="large" name='angle double right'/>, icon: true }}
                    prevItem={{ content: <Icon size="large" name='angle left'/>, icon: true }}
                    nextItem={{ content: <Icon size="large" name='angle right'/>, icon: true }}
                    pageItem={{ content: <Header content={this.state.activePage}/>}}
                    siblingRange={0}
                    boundaryRange={0}
                    ellipsisItem={null}
                />
            );
        } else {
            return null;
        }
    };
}

const mapStateToProps = (state) => {
    return {
        games: state.game
    };
};

export default connect(mapStateToProps)(GameList);