package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.UserMetaRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.TenantMeta;

import java.util.Optional;

@Service
public class UserMetaManager {
    private UserMetaRepo userMetaRepo;

    @Autowired
    public UserMetaManager(UserMetaRepo userMetaRepo) {
        this.userMetaRepo = userMetaRepo;
    }

    public Optional<TenantMeta> findById(Long id) {
        return userMetaRepo.findById(id);
    }

    public Iterable<TenantMeta> findAll() {
        return userMetaRepo.findAll();
    }

    public TenantMeta save(TenantMeta tenantMeta) {
        return userMetaRepo.save(tenantMeta);
    }

    public void deleteById(Long id) {
        userMetaRepo.deleteById(id);
    }


}
