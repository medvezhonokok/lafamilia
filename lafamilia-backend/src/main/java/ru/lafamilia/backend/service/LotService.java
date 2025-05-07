package ru.lafamilia.backend.service;

import org.springframework.stereotype.Service;
import ru.lafamilia.backend.form.LotCredentials;
import ru.lafamilia.backend.model.FlavorDescriptor;
import ru.lafamilia.backend.model.Lot;
import ru.lafamilia.backend.repository.FlavorDescriptorRepository;
import ru.lafamilia.backend.repository.LotRepository;

import java.util.List;

@Service
public class LotService {
    private final FlavorDescriptorRepository flavorDescriptorRepository;
    private final LotRepository lotRepository;

    public LotService(FlavorDescriptorRepository flavorDescriptorRepository, LotRepository lotRepository) {
        this.flavorDescriptorRepository = flavorDescriptorRepository;
        this.lotRepository = lotRepository;
    }

    public List<Lot> findAll() {
        return lotRepository.findAll();
    }

    public Lot findById(Long lotId) {
        return lotRepository.findById(lotId).orElse(null);
    }

    public Lot update(Long lotId, LotCredentials credentials) {
        return lotRepository.save(updateLot(findById(lotId), credentials));
    }

    private Lot updateLot(Lot lot, LotCredentials credentials) {
        lot.setVariety(credentials.getVariety());
        lot.setProcessing(credentials.getProcessing());
        lot.setDepartment(credentials.getDepartment());
        lot.setFarm(credentials.getFarm());
        lot.setAroma(credentials.getAroma());
        lot.setFlavor(credentials.getFlavor());
        lot.setAftertaste(credentials.getAftertaste());
        lot.setAcidity(credentials.getAcidity());
        lot.setBody(credentials.getBody());
        lot.setBalance(credentials.getBalance());
        lot.setPrice(credentials.getPrice());
        lot.setOverall(credentials.getOverall());
        lot.setSweetness(credentials.getSweetness());
        lot.setCleanCup(credentials.getCleanCup());
        lot.setUniformity(credentials.getUniformity());
        lot.setDescription(credentials.getDescription());
        lot.getFlavorDescriptors().clear();

        if (credentials.getFlavorDescriptorIds() != null) {
            List<FlavorDescriptor> flavorDescriptors = flavorDescriptorRepository.findAll().stream().filter(
                    flavorDescriptor -> credentials.getFlavorDescriptorIds().contains(flavorDescriptor.getId())
            ).toList();
            lot.getFlavorDescriptors().addAll(flavorDescriptors);
        }

        return lot;
    }

    public void deleteById(long lotId) {
        Lot lot = findById(lotId);
        lotRepository.delete(lot);
    }

    public Lot save(LotCredentials credentials) {
        return lotRepository.save(updateLot(new Lot(), credentials));
    }
}
