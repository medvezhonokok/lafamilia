package ru.lafamilia.backend.form;


import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import ru.lafamilia.backend.model.FlavorDescriptor;
import ru.lafamilia.backend.model.enums.LotProcessing;
import ru.lafamilia.backend.model.enums.LotVariety;

import javax.validation.constraints.*;
import java.util.Set;

@Setter
@Getter
public class LotCredentials {
    @NotNull(message = "Variety cannot be null")
    private LotVariety variety;

    @NotNull(message = "Processing cannot be null")
    private LotProcessing processing;

    @NotBlank(message = "Department cannot be blank")
    private String department;

    @NotBlank(message = "Farm cannot be blank")
    private String farm;

    @DecimalMin(value = "0.0", message = "Aroma must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Aroma must be between 0 and 10")
    private Double aroma;

    @DecimalMin(value = "0.0", message = "Flavor must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Flavor must be between 0 and 10")
    private Double flavor;

    @DecimalMin(value = "0.0", message = "Aftertaste must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Aftertaste must be between 0 and 10")
    private Double aftertaste;

    @DecimalMin(value = "0.0", message = "Acidity must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Acidity must be between 0 and 10")
    private Double acidity;

    @DecimalMin(value = "0.0", message = "Body must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Body must be between 0 and 10")
    private Double body;

    @DecimalMin(value = "0.0", message = "Balance must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Balance must be between 0 and 10")
    private Double balance;

    @DecimalMin(value = "0.0", message = "Uniformity must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Uniformity must be between 0 and 10")
    private Double uniformity;

    @DecimalMin(value = "0.0", message = "Sweetness must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Sweetness must be between 0 and 10")
    private Double sweetness;

    @DecimalMin(value = "0.0", message = "Clean cup must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Clean cup must be between 0 and 10")
    private Double cleanCup;

    @DecimalMin(value = "0.0", message = "Overall must be between 0 and 10")
    @DecimalMax(value = "10.0", message = "Overall must be between 0 and 10")
    private Double overall;

    @Positive(message = "Price must be positive")
    private Double price;

    @Size(max = 1000, message = "Description is too long, it should be less 1000 characters")
    private String description;

    private Set<Long> flavorDescriptorIds;
}