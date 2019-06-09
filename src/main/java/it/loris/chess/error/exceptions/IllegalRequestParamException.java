package it.loris.chess.error.exceptions;

public class IllegalRequestParamException extends RuntimeException {

    public IllegalRequestParamException(String message){
        super(message);
    }
}
