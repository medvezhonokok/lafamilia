package ru.lafamilia.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.lafamilia.backend.model.enums.DescriptorCategory;

@Setter
@Getter
@Entity
@Table(name = "flavor_descriptors")
public class FlavorDescriptor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String colorHex;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DescriptorCategory category;
}