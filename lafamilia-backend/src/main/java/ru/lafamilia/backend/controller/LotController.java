package ru.lafamilia.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import ru.lafamilia.backend.exception.ValidationException;
import ru.lafamilia.backend.form.LotCredentials;
import ru.lafamilia.backend.form.validator.LotCredentialsValidator;
import ru.lafamilia.backend.model.FlavorDescriptor;
import ru.lafamilia.backend.model.Lot;
import ru.lafamilia.backend.repository.FlavorDescriptorRepository;
import ru.lafamilia.backend.service.LotService;

import java.util.List;

@RestController
@RequestMapping("/api/lots")
public class LotController {
    private final LotService lotService;
    private final FlavorDescriptorRepository flavorDescriptorRepository;
    private final LotCredentialsValidator lotCredentialsValidator;

    public LotController(LotService lotService, FlavorDescriptorRepository flavorDescriptorRepository,
                         LotCredentialsValidator lotCredentialsValidator) {
        this.lotService = lotService;
        this.flavorDescriptorRepository = flavorDescriptorRepository;
        this.lotCredentialsValidator = lotCredentialsValidator;
    }

    @GetMapping("/all")
    public List<Lot> findAllLots() {
        return lotService.findAll();
    }

    @GetMapping("/descriptors")
    public List<FlavorDescriptor> findAllDescriptors() {
        return flavorDescriptorRepository.findAll();
    }

    @PostMapping("/delete/{lotId}")
    public void deleteLot(@PathVariable long lotId, HttpSession session) {
        if (hasUser(session)) {
            lotCredentialsValidator.validateLotId(lotId);
            lotService.deleteById(lotId);
        }
    }

    @PostMapping("/update/{lotId}")
    public Lot update(@PathVariable Long lotId, @RequestBody LotCredentials credentials, HttpSession session,
                      BindingResult bindingResult) {
        if (hasUser(session)) {
            lotCredentialsValidator.validate(credentials, bindingResult);
            lotCredentialsValidator.validateLotId(lotId);

            if (bindingResult.hasErrors()) {
                throw new ValidationException(bindingResult);
            }

            return lotService.update(lotId, credentials);
        } else {
            bindingResult.addError(new ObjectError("user", "User is not present"));
            throw new ValidationException(bindingResult);
        }
    }

    @PostMapping("/add")
    public Lot add(@RequestBody LotCredentials credentials, HttpSession session,
                   BindingResult bindingResult) {
        if (hasUser(session)) {
            lotCredentialsValidator.validate(credentials, bindingResult);

            if (bindingResult.hasErrors()) {
                throw new ValidationException(bindingResult);
            }

            return lotService.save(credentials);
        } else {
            bindingResult.addError(new ObjectError("user", "User is not present"));
            throw new ValidationException(bindingResult);
        }
    }

    private boolean hasUser(HttpSession session) {
        return session.getAttribute("user") != null;
    }
}