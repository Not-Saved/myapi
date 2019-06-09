package it.loris.chess.util;

public class Enums {

    public enum Color {WHITE, BLACK}

    public enum MoveType {MOVE, CAPTURE, EN_PASSANT, SHORT_CASTLING, LONG_CASTLING}

    public enum GameState {NEW, IN_PROGRESS, ENDED}
}
