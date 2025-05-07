package ru.lafamilia.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.lafamilia.backend.model.enums.LotProcessing;
import ru.lafamilia.backend.model.enums.LotVariety;

import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@Entity
@Table(name = "lots")
public class Lot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LotVariety variety;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LotProcessing processing;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String farm;

    @Column
    private Double aroma;

    @Column
    private Double flavor;

    @Column
    private Double aftertaste;

    @Column
    private Double acidity;

    @Column
    private Double body;

    @Column
    private Double balance;

    @Column
    private Double price;

    @Column
    private Double uniformity;

    @Column
    private Double sweetness;

    @Column
    private Double cleanCup;

    @Column
    private Double overall;

    @Column
    private String description;

    private Double qGrade;

    @ManyToMany
    @JoinTable(
            name = "lot_flavor_descriptors",
            joinColumns = @JoinColumn(name = "lot_id"),
            inverseJoinColumns = @JoinColumn(name = "descriptor_id")
    )
    private Set<FlavorDescriptor> flavorDescriptors = new HashSet<>();

    public Double getqGrade() {
        return (double) (int) (aroma + flavor + aftertaste + acidity + body + balance + uniformity + cleanCup + overall + sweetness);
    }

    public void setqGrade(Double qGrade) {
        this.qGrade = qGrade;
    }
}