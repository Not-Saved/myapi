package it.loris.chess.chess;

import it.loris.chess.entities.Game;
import it.loris.chess.entities.Move;
import it.loris.chess.entities.Player;

public class ChessGame {

	public static void advanceGame(Game game, Move lastMove) {
		Board board = new Board(BoardBuilder.buildAtStart());

		for(Move move : game.getMoves()){
			board = proposeMove(board, move);
		}

		board = proposeMove(board, lastMove);

		if (winCondition(board, lastMove.getPlayer())) {
			game.setInProgress(false);
			lastMove.getPlayer().setWinner(true);
		}
	}

	private static Board proposeMove(Board board, Move move) {
		Square movingFromSquare = board.getPosition(move.getMovingFrom());
		if(movingFromSquare.piece == null){
			throw new IllegalArgumentException("Invalid move: no piece present in starting square");
		}
		else if (movingFromSquare.piece.color != move.getPlayer().getColor()) {
			throw new IllegalArgumentException("Invalid move: selected piece belongs to the opponent");
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
				throw new IllegalStateException("???");
			}
		}
		catch (IllegalArgumentException exc) {
			return true;
		}
	}
}
