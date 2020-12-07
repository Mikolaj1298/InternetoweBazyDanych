package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.ContractRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Contract;

import java.util.Optional;

@Service
public class ContractManager {

    private ContractRepo contractRepo;

    @Autowired
    public ContractManager(ContractRepo contractRepo) {
        this.contractRepo = contractRepo;
    }

    public Optional<Contract> findById(Long id) {
        return contractRepo.findById(id);
    }

    public Iterable<Contract> findAll() {
        return contractRepo.findAll();
    }

    public Contract save(Contract contract) {
        return contractRepo.save(contract);
    }

    public void delete(Contract contract) {
        contractRepo.delete(contract);
    }

    public void deleteById(Long id) {
        contractRepo.deleteById(id);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fillDB() {

    }

}
