package ru.lafamilia.backend.service;

import org.springframework.stereotype.Service;
import ru.lafamilia.backend.model.Lot;
import ru.lafamilia.backend.repository.LotRepository;
import ru.lafamilia.backend.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
