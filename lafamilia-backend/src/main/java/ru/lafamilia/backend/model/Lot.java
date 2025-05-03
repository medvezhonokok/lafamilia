package ru.lafamilia.backend.model;

import jakarta.persistence.*;
import ru.lafamilia.backend.model.enums.LotProcessing;
import ru.lafamilia.backend.model.enums.LotVariety;

import java.util.HashSet;
import java.util.Set;

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
    private String description;

    @ManyToMany
    @JoinTable(
            name = "lot_flavor_descriptors",
            joinColumns = @JoinColumn(name = "lot_id"),
            inverseJoinColumns = @JoinColumn(name = "descriptor_id")
    )
    private Set<FlavorDescriptor> flavorDescriptors = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LotVariety getVariety() {
        return variety;
    }

    public void setVariety(LotVariety lotVariety) {
        this.variety = lotVariety;
    }

    public LotProcessing getProcessing() {
        return processing;
    }

    public void setProcessing(LotProcessing processing) {
        this.processing = processing;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Set<FlavorDescriptor> getFlavorDescriptors() {
        return flavorDescriptors;
    }

    public void setFlavorDescriptors(Set<FlavorDescriptor> flavorDescriptors) {
        this.flavorDescriptors = flavorDescriptors;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getAroma() {
        return aroma;
    }

    public void setAroma(Double aroma) {
        this.aroma = aroma;
    }

    public Double getFlavor() {
        return flavor;
    }

    public void setFlavor(Double flavor) {
        this.flavor = flavor;
    }

    public Double getAftertaste() {
        return aftertaste;
    }

    public void setAftertaste(Double aftertaste) {
        this.aftertaste = aftertaste;
    }

    public Double getAcidity() {
        return acidity;
    }

    public void setAcidity(Double acidity) {
        this.acidity = acidity;
    }

    public Double getBody() {
        return body;
    }

    public void setBody(Double body) {
        this.body = body;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}