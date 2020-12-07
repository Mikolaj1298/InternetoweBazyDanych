package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.OwnerMetaRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.OwnerMeta;

import java.util.Optional;

@Service
public class OwnerMetaManager {
    private OwnerMetaRepo ownerMetaRepo;

    @Autowired
    public OwnerMetaManager(OwnerMetaRepo ownerMetaRepo) {
        this.ownerMetaRepo = ownerMetaRepo;
    }

    public Optional<OwnerMeta> findById(Long id) {
        return ownerMetaRepo.findById(id);
    }

    public Iterable<OwnerMeta> findAll() {
        return ownerMetaRepo.findAll();
    }

    public OwnerMeta save(OwnerMeta ownerMeta) {
        return ownerMetaRepo.save(ownerMeta);
    }

    public void deleteById(Long id) {
        ownerMetaRepo.deleteById(id);
    }


}
