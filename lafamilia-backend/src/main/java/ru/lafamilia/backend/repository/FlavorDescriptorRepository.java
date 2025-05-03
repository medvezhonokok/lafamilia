package ru.lafamilia.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.lafamilia.backend.model.FlavorDescriptor;
import ru.lafamilia.backend.model.Lot;

@Repository
public interface FlavorDescriptorRepository extends JpaRepository<FlavorDescriptor, Long> {

}
