package it.loris.myapi.chess.basicdata;

import it.loris.myapi.enums.Color;

import java.util.Arrays;

import static it.loris.myapi.chess.util.MyMath.arrayAbs;

public class Knight extends Piece {

	public Knight(Color color, String name) {
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
