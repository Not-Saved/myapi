package it.loris.myapi.config;

import it.loris.myapi.util.IllegalRequestParamException;
import it.loris.myapi.util.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.exceptions.UnauthorizedUserException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.LinkedHashMap;

@RestControllerAdvice
public class ExceptionHandlerController {

    @ResponseBody
    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException exception, HttpServletRequest request) {
        LinkedHashMap<String, Object> map = new LinkedHashMap();
        map.put("timestamp", new Date());
        map.put("status", HttpStatus.NOT_FOUND.value());
        map.put("error", "Resource Not Found");
        map.put("message", exception.getMessage());
        map.put("path", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(map);
    }

    @ResponseBody
    @ExceptionHandler(value = IllegalRequestParamException.class)
    public ResponseEntity<?> handleIllegalRequestParamException(IllegalRequestParamException exception, HttpServletRequest request) {
        LinkedHashMap<String, Object> map = new LinkedHashMap();
        map.put("timestamp", new Date());
        map.put("status", HttpStatus.BAD_REQUEST.value());
        map.put("error", "Illegal Request Parameters");
        map.put("message", exception.getMessage());
        map.put("path", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
    }

    @ResponseBody
    @ExceptionHandler(value = UnauthorizedUserException.class)
    public ResponseEntity<?> handleUnauthorizedUserException(UnauthorizedUserException exception, HttpServletRequest request) {
        LinkedHashMap<String, Object> map = new LinkedHashMap();
        map.put("timestamp", new Date());
        map.put("status", HttpStatus.UNAUTHORIZED.value());
        map.put("error", "Unauthorized User");
        map.put("error message", exception.getMessage());
        map.put("path", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
    }
}
