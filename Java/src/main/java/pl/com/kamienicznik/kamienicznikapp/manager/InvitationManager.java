package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.InvitationRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Invitation;

import java.util.Optional;

@Service
public class InvitationManager {

    private InvitationRepo invitationRepo;

    @Autowired
    public InvitationManager(InvitationRepo invitationRepo) {
        this.invitationRepo = invitationRepo;
    }

    public Optional<Invitation> findById(Long id) {
        return invitationRepo.findById(id);
    }

    public Iterable<Invitation> findAll() {
        return invitationRepo.findAll();
    }

    public Invitation save(Invitation invitation) {
        return invitationRepo.save(invitation);
    }

    public void deleteById(Long id) {
        invitationRepo.deleteById(id);
    }
}
