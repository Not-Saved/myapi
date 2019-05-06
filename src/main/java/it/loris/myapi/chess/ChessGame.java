package it.loris.myapi.chess;

import it.loris.myapi.entities.Game;
import it.loris.myapi.entities.Move;
import it.loris.myapi.entities.Player;

public class ChessGame {

	public static void advanceGame(Game game, Move lastMove) {
		Board board = new Board(BoardBuilder.buildAtStart());

		for(Move move : game.getMoves()){
			board = proposeMove(board, move);
		}

		board = proposeMove(board, lastMove);

		if (winCondition(board, lastMove.getPlayer())) {
			game.setInProgress(false);
			game.setWinner(lastMove.getPlayer());
		}
	}

	private static Board proposeMove(Board board, Move move) {
		Square movingFromSquare = board.getPosition(move.getMovingFrom());
		if(movingFromSquare.piece == null){
			throw new IllegalArgumentException("No piece to move!");
		}
		else if (movingFromSquare.piece.color != move.getPlayer().getColor()) {
			throw new IllegalArgumentException("Can't move opponent pieces!");
		}
		return ChessGameMaster.makeMove(board, move);
	}

	private static boolean winCondition(Board board, Player player) {
		try {
			switch (player.getColor()){
			case WHITE:
				board.getPiece("B_K");
				return false;
			case BLACK:
				board.getPiece("W_K");
				return false;
			default:
				throw new IllegalStateException("Should have never went here!");
			}
		}
		catch (IllegalArgumentException exc) {
			return true;
		}
	}
}
