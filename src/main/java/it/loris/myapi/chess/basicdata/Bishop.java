package it.loris.myapi.chess.basicdata;

import it.loris.myapi.util.Color;

import static it.loris.myapi.chess.util.MyMath.isDiagonal;

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
