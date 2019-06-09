package it.loris.chess.chesslogic.basicdata;

import it.loris.chess.util.Enums;

import static it.loris.chess.chesslogic.util.MyMath.isDiagonal;

public class Bishop extends Piece {
	public Bishop(Enums.Color color, String name) {
		super(color, name);
	}
	
	private Bishop(Bishop bishop){
		super(bishop);
	}
	
	@Override
	public Bishop copy(){  
		return new Bishop(this);
	} 

	@Override
	public boolean legalMove(int[] move) {
		return (isDiagonal(move));
	}
}
