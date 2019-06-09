package it.loris.chess.error;

import it.loris.chess.error.exceptions.IllegalRequestParamException;
import it.loris.chess.error.exceptions.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.exceptions.UnauthorizedUserException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ResponseBody
    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException exception, HttpServletRequest request) {
        APIError error = new APIError(
                HttpStatus.NOT_FOUND.value(),
                "Illegal Request Parameters",
                exception.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ResponseBody
    @ExceptionHandler(value = IllegalRequestParamException.class)
    public ResponseEntity<?> handleIllegalRequestParamException(IllegalRequestParamException exception, HttpServletRequest request) {
        APIError error = new APIError(
                HttpStatus.NOT_FOUND.value(),
                "Illegal Request Parameters",
                exception.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ResponseBody
    @ExceptionHandler(value = UnauthorizedUserException.class)
    public ResponseEntity<?> handleUnauthorizedUserException(UnauthorizedUserException exception, HttpServletRequest request) {
        APIError error = new APIError(
                HttpStatus.NOT_FOUND.value(),
                "Illegal Request Parameters",
                exception.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
}
