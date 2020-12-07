package pl.com.kamienicznik.kamienicznikapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Role;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.RoleName;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
