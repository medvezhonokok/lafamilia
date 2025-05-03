package ru.lafamilia.backend.form.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.lafamilia.backend.form.UserCredentials;
import ru.lafamilia.backend.repository.UserRepository;
import ru.lafamilia.backend.util.StringUtil;

@Component
public class UserCredentialsValidator implements Validator {
    private final UserRepository userRepository;

    public UserCredentialsValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return UserCredentials.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserCredentials userCredentials = (UserCredentials) target;

        if (StringUtil.isNullOrEmpty(userCredentials.getLogin())) {
            errors.rejectValue("login", "login.required", "Login is required");
        }

        if (StringUtil.isNullOrEmpty(userCredentials.getPassword())) {
            errors.rejectValue("password", "password.required", "Password is required");
        }

        if (userRepository.findByLoginAndPassword(userCredentials.getLogin(), userCredentials.getPassword()) == null) {
            errors.rejectValue("login", "error.login.invalid", "Invalid login or password");
        }
    }
}
