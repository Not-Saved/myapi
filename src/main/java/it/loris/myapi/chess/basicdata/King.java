package it.loris.myapi.chess.basicdata;

import it.loris.myapi.enums.Color;

import static it.loris.myapi.chess.util.MyMath.*;

import java.util.Arrays;

public class King extends Piece {
	public King(Color color, String name) {
		super(color, name);
	}
	
	private King(King king){
		super(king);
	}
	
	@Override
	public King copy(){  
		return new King(this);
	} 

	@Override
	public boolean legalMove(int[] move) {
		return((isStraight(move) || isDiagonal(move)) && squareDistance(move) == 1);
	}

	@Override
	public boolean legalShortCastling(int[] move) {
		int[] oo = {2, 0};
		return (Arrays.equals(move, oo) && moveCount == 0);
	}
	
	@Override
	public boolean legalLongCastling(int[] move) {
		int[] ooo = {-2, 0};
		return (Arrays.equals(move, ooo) && moveCount == 0);
	}
}
