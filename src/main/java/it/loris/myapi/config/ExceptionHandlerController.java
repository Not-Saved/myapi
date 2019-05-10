package it.loris.myapi.config;

import it.loris.myapi.util.IllegalRequestParamException;
import it.loris.myapi.util.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ResponseBody
    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException exception) {
        LinkedHashMap map = new LinkedHashMap();
        map.put("error", exception.getClass().getSimpleName());
        map.put("error message", exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
    }

    @ResponseBody
    @ExceptionHandler(value = IllegalRequestParamException.class)
    public ResponseEntity<?> handleIllegalRequestParamException(IllegalRequestParamException exception) {
        LinkedHashMap map = new LinkedHashMap();
        map.put("error", exception.getClass().getSimpleName());
        map.put("error message", exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
    }
}
