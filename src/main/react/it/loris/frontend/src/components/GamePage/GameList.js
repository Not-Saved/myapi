import React, { Component } from 'react';
import { connect } from "react-redux";
import { Icon, Pagination, Responsive } from "semantic-ui-react";
import GameCard from "./GameCard";

class GameList extends Component {
    state = {
        activePage: 1,
        pageSize: null
    };

    componentDidMount() {
        this.setPageSize();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const gamesArray = Object.values(this.props.games);
        if(this.state.activePage > Math.ceil(gamesArray.length / this.state.pageSize) && gamesArray[0]){
            this.setState({activePage: 1})
        }
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage });
    }

    setPageSize = () => {
        this.setState({ pageSize: Math.floor((window.innerHeight * 0.70) / 130) });
    };

    render() {
        const gamesArray = Object.values(this.props.games);
        if (this.props.games && gamesArray[0]) {
            return (
                <>
                    <Responsive
                        fireOnMount
                        onUpdate={this.setPageSize}
                        style={{ marginTop: "4vh", marginBottom: "3vh" }}
                    >
                        {this.renderGameCards(gamesArray)}
                    </Responsive>
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
                    secondary
                    activePage={this.state.activePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={pages}

                    pageItem={null}
                    firstItem={{ content: <Icon size="large" name='angle double left'/>, icon: true }}
                    lastItem={{ content: <Icon size="large" name='angle double right'/>, icon: true }}
                    prevItem={{ content: <Icon size="large" name='angle left'/>, icon: true }}
                    nextItem={{ content: <Icon size="large" name='angle right'/>, icon: true }}
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