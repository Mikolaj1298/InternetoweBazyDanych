package pl.com.kamienicznik.kamienicznikapp.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Invitation;

@Repository
public interface InvitationRepo extends CrudRepository<Invitation, Long> {
}
