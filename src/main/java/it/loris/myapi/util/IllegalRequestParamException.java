package it.loris.myapi.util;

public class IllegalRequestParamException extends RuntimeException {

    public IllegalRequestParamException(String message){
        super(message);
    }
}
