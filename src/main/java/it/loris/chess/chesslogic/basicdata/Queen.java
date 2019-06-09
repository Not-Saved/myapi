package it.loris.chess.chesslogic.basicdata;

import it.loris.chess.util.Enums;

import static it.loris.chess.chesslogic.util.MyMath.*;

public class Queen extends Piece {
	public Queen(Enums.Color color, String name) {
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
