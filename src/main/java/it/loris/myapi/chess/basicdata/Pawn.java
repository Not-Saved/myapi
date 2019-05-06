package it.loris.myapi.chess.basicdata;

import it.loris.myapi.enums.Color;

import java.util.Arrays;

import static it.loris.myapi.chess.util.MyMath.*;

public class Pawn extends Piece {
	public Pawn(Color color, String name) {
		super(color, name);
	}
	
	private Pawn(Pawn pawn){
		super(pawn);
	}
	
	@Override
	public Pawn copy(){  
		return new Pawn(this);
	}  
	
	@Override
	public boolean legalMove(int[] move) {
		switch(this.color){
			case WHITE:
				if (Arrays.equals(move, arrayScale(Vy(),+1))) return true;
				if (Arrays.equals(move, arrayScale(Vy(),+2)) && this.moveCount == 0) return true;
				break;
			case BLACK:
				if (Arrays.equals(move, arrayScale(Vy(),-1))) return true;
				if (Arrays.equals(move, arrayScale(Vy(),-2)) && this.moveCount == 0) return true;
				break;
		}
		return false;
	}

	@Override
	public boolean legalCapture(int[] move) {
		switch(this.color){
			case WHITE:
				if (Arrays.equals(move, arrayScaleAdd(+1, Vx(), +1, Vy()))) return true;
				if (Arrays.equals(move, arrayScaleAdd(-1, Vx(), +1, Vy()))) return true;
				break;
			case BLACK:
				if (Arrays.equals(move, arrayScaleAdd(+1, Vx(), -1, Vy()))) return true;
				if (Arrays.equals(move, arrayScaleAdd(-1, Vx(), -1, Vy()))) return true;
				break;
		}
		return false;
	}
	
	@Override
	public boolean legalPromote(int[] toSquareArray) {
		switch(this.color) {
		case WHITE:
			return  (toSquareArray[1] == 7);
		case BLACK:
			return  (toSquareArray[1] == 0);
		default: 
			throw new IllegalArgumentException("Should have never went here!");
		}
	}
}
