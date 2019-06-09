package it.loris.chess.chesslogic.basicdata;

import it.loris.chess.util.Enums;

import static it.loris.chess.chesslogic.util.MyMath.*;

public class Rook extends Piece {
	public Rook(Enums.Color color, String name) {
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