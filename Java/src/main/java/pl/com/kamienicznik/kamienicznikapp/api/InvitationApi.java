package pl.com.kamienicznik.kamienicznikapp.api;

import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Apartment;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Invitation;
import pl.com.kamienicznik.kamienicznikapp.manager.ApartmentManager;
import pl.com.kamienicznik.kamienicznikapp.manager.InvitationManager;
import pl.com.kamienicznik.kamienicznikapp.manager.UserManager;
import pl.com.kamienicznik.kamienicznikapp.security.services.UserPrinciple;

import java.util.Map;

@RestController
@RequestMapping("/api/invitation")
public class InvitationApi {

    private UserManager userManager;
    private InvitationManager invitationManager;
    private ApartmentManager apartmentManager;

    @Autowired
    public InvitationApi(UserManager userManager, InvitationManager invitationManager, ApartmentManager apartmentManager) {
        this.userManager = userManager;
        this.invitationManager = invitationManager;
        this.apartmentManager = apartmentManager;
    }

    @GetMapping("/getAll")
    public Iterable<Invitation> getAll() {
        return invitationManager.findAll();
    }

    @PostMapping("/add")
    public Invitation addInvitation(@RequestBody Map<String, Long> invitationMap) {
        Invitation invitation = new Invitation();
        invitation.setUser(userManager.findById(invitationMap.get("recipientId")).get());
        invitation.setApartment(apartmentManager.findById(invitationMap.get("apartmentId")).get());
        return invitationManager.save(invitation);
    }

    @DeleteMapping("/resolve")
    public Boolean resolveInvitation(@RequestParam Long id, @RequestParam Boolean accept) {
        System.out.println(id);
        System.out.println(accept);

        Invitation invitation = invitationManager.findById(id).get();
        System.out.println(invitation.getApartment().getID());
        System.out.println(invitation.getUser().getId());
        if (accept) {
            Apartment apartment = apartmentManager.findById(invitation.getApartment().getID()).get();
            apartment.addUser(userManager.findById(invitation.getUser().getId()).get());
        }
        invitationManager.deleteById(invitation.getID());
        

//        apartmentManager.save(apartment);
        return true;
    }
}
