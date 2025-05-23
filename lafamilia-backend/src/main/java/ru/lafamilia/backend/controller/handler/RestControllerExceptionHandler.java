package ru.lafamilia.backend.controller.handler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.lafamilia.backend.exception.NoSuchResourceException;
import ru.lafamilia.backend.exception.ValidationException;

@RestControllerAdvice
public class RestControllerExceptionHandler {
    private static String getErrorMessage(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ObjectError objectError = bindingResult.getAllErrors().get(0);
            if (objectError instanceof FieldError fieldError) {
                return fieldError.getField() + "=-=-=" + fieldError.getDefaultMessage();
            } else {
                return objectError.getDefaultMessage();
            }
        } else {
            return null;
        }
    }

    @ExceptionHandler(NoSuchResourceException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void onNoSuchResourceException() {
        // No operations.
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Object> onValidationException(ValidationException e) {
        String errorMessage = getErrorMessage(e.getBindingResult());
        return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }
}
