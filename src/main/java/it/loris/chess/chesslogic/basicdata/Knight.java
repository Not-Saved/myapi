package it.loris.chess.chesslogic.basicdata;

import it.loris.chess.util.Enums;

import java.util.Arrays;

import static it.loris.chess.chesslogic.util.MyMath.arrayAbs;

public class Knight extends Piece {

	public Knight(Enums.Color color, String name) {
		super(color, name);
	}
	
	private Knight(Knight knight){
		super(knight);
	}
	
	@Override
	public Knight copy(){  
		return new Knight(this);
	} 

	@Override
	public boolean legalMove(int[] move) {
		int[] option1 = {1,2};
		int[] option2 = {2,1};
		return (Arrays.equals(arrayAbs(move), option1) || Arrays.equals(arrayAbs(move), option2));
	}
}
