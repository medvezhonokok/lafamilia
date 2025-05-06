package ru.lafamilia.backend.form.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.lafamilia.backend.form.LotCredentials;
import ru.lafamilia.backend.model.FlavorDescriptor;
import ru.lafamilia.backend.repository.FlavorDescriptorRepository;
import ru.lafamilia.backend.service.LotService;

import javax.validation.ValidationException;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class LotCredentialsValidator implements Validator {
    private final LotService lotService;
    private final FlavorDescriptorRepository flavorDescriptorService;

    public LotCredentialsValidator(LotService lotService,
                                   FlavorDescriptorRepository flavorDescriptorService) {
        this.lotService = lotService;
        this.flavorDescriptorService = flavorDescriptorService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return LotCredentials.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        LotCredentials credentials = (LotCredentials) target;
        if (credentials.getVariety() == null) {
            errors.rejectValue("variety", "variety.empty", "Variety is not selected");
        }

        if (credentials.getProcessing() == null) {
            errors.rejectValue("processing", "processing.empty", "Processing is not selected");
        }
        validateFlavorDescriptors(credentials.getFlavorDescriptorIds(), errors);
        validateScores(credentials, errors);
        validatePrice(credentials.getPrice(), errors);
    }

    private void validateFlavorDescriptors(Set<Long> descriptorIds, Errors errors) {
        if (descriptorIds == null || descriptorIds.isEmpty()) {
            errors.rejectValue("flavorDescriptorIds", "flavorDescriptors.empty",
                    "At least one flavor descriptor must be selected");
            return;
        }

        Set<Long> existingIds = flavorDescriptorService.findAll().stream().map(FlavorDescriptor::getId).collect(Collectors.toSet());
        for (Long descriptorId : descriptorIds) {
            if (!existingIds.contains(descriptorId)) {
                errors.rejectValue("flavorDescriptorIds", "flavorDescriptors.notFound",
                        "Some flavor descriptors not found: " + descriptorIds);
            }
        }
    }

    private void validateScores(LotCredentials credentials, Errors errors) {
        validateScoreRange(credentials.getAroma(), "aroma", errors);
        validateScoreRange(credentials.getFlavor(), "flavor", errors);
        validateScoreRange(credentials.getAftertaste(), "aftertaste", errors);
        validateScoreRange(credentials.getAcidity(), "acidity", errors);
        validateScoreRange(credentials.getBody(), "body", errors);
        validateScoreRange(credentials.getBalance(), "balance", errors);
    }

    private void validateScoreRange(Double score, String field, Errors errors) {
        if (score == null) {
            errors.rejectValue(field, field + ".null",
                    "Score cannot be null");
            return;
        }

        if (score < 0 || score > 10) {
            errors.rejectValue(field, field + ".invalid",
                    "Score must be between 0 and 10");
        }
    }

    private void validatePrice(Double price, Errors errors) {
        if (price == null) {
            errors.rejectValue("price", "price.null",
                    "Price cannot be null");
            return;
        }

        if (price <= 0) {
            errors.rejectValue("price", "price.invalid",
                    "Price must be positive");
        }
    }

    public void validateLotId(Long lotId) {
        if (lotId == null || lotService.findById(lotId) == null) {
            throw new ValidationException("Cannot find lot");
        }
    }
}