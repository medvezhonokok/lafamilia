package ru.lafamilia.backend.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.lafamilia.backend.exception.ValidationException;
import ru.lafamilia.backend.form.UserCredentials;
import ru.lafamilia.backend.form.validator.UserCredentialsValidator;
import ru.lafamilia.backend.model.User;
import ru.lafamilia.backend.repository.UserRepository;
import ru.lafamilia.backend.service.JwtService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserCredentialsValidator userCredentialsValidator;

    public AuthController(UserRepository userRepository, JwtService jwtService, UserCredentialsValidator userCredentialsValidator) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.userCredentialsValidator = userCredentialsValidator;
    }

    @InitBinder("credentials")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(userCredentialsValidator);
    }

    @PostMapping("/login")
    public String login(@Valid @RequestBody UserCredentials credentials, BindingResult bindingResult) {
        userCredentialsValidator.validate(credentials, bindingResult);

        if (bindingResult.hasErrors()) {
            throw new ValidationException(bindingResult);
        }

        return jwtService.getUserJWT(userRepository.findByLoginAndPassword(credentials.getLogin(), credentials.getPassword()));
    }

    @GetMapping("/user")
    public User getCurrentUser(@RequestHeader("Authorization") String token) {
        return jwtService.findUserByJWT(token.replace("Bearer ", ""));
    }
}