package ru.lafamilia.backend.exception;

import lombok.Getter;
import org.springframework.validation.BindingResult;

@Getter
public class NonAuthenticatedException extends RuntimeException {
    private final BindingResult bindingResult;

    public NonAuthenticatedException(BindingResult bindingResult) {
        this.bindingResult = bindingResult;
    }
}
