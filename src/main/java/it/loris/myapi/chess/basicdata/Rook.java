package it.loris.myapi.chess.basicdata;

import it.loris.myapi.util.Color;

import static it.loris.myapi.chess.util.MyMath.*;

public class Rook extends Piece {
	public Rook(Color color, String name) {
		super(color, name);
	}
	
	private Rook(Rook rook){
		super(rook);
	}
	
	@Override
	public Rook copy(){  
		return new Rook(this);
	}  
	
	@Override
	public boolean legalMove(int[] move) {
		return (isStraight(move));
	}
	
}