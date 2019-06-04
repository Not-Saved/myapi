package it.loris.chess.chess.basicdata;

import it.loris.chess.util.Color;

import static it.loris.chess.chess.util.MyMath.*;

public class Queen extends Piece {
	public Queen(Color color, String name) {
		super(color, name);
	}
	
	private Queen(Queen queen){
		super(queen);
	}
	
	@Override
	public Queen copy(){  
		return new Queen(this);
	} 
	
	@Override
	public boolean legalMove(int[] move) {
		return (isStraight(move) || isDiagonal(move));
	}
}
