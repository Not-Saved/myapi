package it.loris.chess.chess.basicdata;

import it.loris.chess.util.Color;

import static it.loris.chess.chess.util.MyMath.isDiagonal;

public class Bishop extends Piece {
	public Bishop(Color color, String name) {
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
