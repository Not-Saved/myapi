package it.loris.chess.error;

import lombok.Data;

import java.util.Date;

@Data
public class APIError {

    private final Date timeStamp = new Date();
    private final int status;
    private final String error;
    private final String message;
    private final String path;
}
