package ru.lafamilia.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.lafamilia.backend.model.Lot;

@Repository
public interface LotRepository extends JpaRepository<Lot, Long> {
}
