package it.loris.chess.chesslogic;

import it.loris.chess.chesslogic.basicdata.Piece;
import it.loris.chess.chesslogic.basicdata.Position;

public class Square {
	public final Piece piece;
	public final Position position;
	
	public Square(Piece piece, Position position) {
		this.piece = piece;
		this.position = position;
	}
	
	public Square(Position position) {
		this(null, position);
	}
	
	public Square move(int x, int y) {
		return new Square(this.piece.copy(), new Position(x, y));
	}
	
	public Square move(int[] array) {
		return new Square(this.piece.copy(), new Position(array[0], array[1]));
	}
}
