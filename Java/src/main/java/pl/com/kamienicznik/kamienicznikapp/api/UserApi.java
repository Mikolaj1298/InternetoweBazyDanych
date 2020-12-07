package pl.com.kamienicznik.kamienicznikapp.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Apartment;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Invitation;
import pl.com.kamienicznik.kamienicznikapp.manager.*;
import pl.com.kamienicznik.kamienicznikapp.security.services.UserPrinciple;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserApi {

    @Autowired
    private UserManager userManager;

    @Autowired
    private OwnerMetaManager ownerMetaManager;

    @Autowired
    private UserMetaManager userMetaManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    public UserApi(UserManager userManager) {
        this.userManager = userManager;
    }

    @GetMapping("/getAll") //pobieranie wszystkich userow
    public Iterable<User> getAll() {
        return userManager.findAll();
    }


    @GetMapping("/getById/{index}") //pobiernaie usera o danym ID
    public Optional<User> getById(@PathVariable Long index) {
        System.out.println(index);
        return userManager.findById(index);
    }

    @PostMapping("/add") //dodawanie usera
    public User addUser(@RequestBody User user) {
        System.out.println("jestem");
        return userManager.save(user);
    }

    @PutMapping("/update") //aktualizowanie uzytkownika
    @PreAuthorize("hasRole('USER') or hasRole('COMPANY')")
    public User updateUser(@RequestBody User user) {

        System.out.println("Podane haslo to"+user.getPassword());
        UserPrinciple user2 = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user3 = userManager.findById(user2.getId()).get();
        user3.setEmail(user.getEmail());
        System.out.println(user3.getPassword());
       user3.setPassword(encoder.encode(user.getPassword()));
        System.out.println(user3.getPassword());
        if(null!=user.getOwner_meta()) {
            user.getOwner_meta().setUser(user3);
            user3.setOwner_meta(user.getOwner_meta());

        }
        else if (null!=user.getTenant_meta()) {
           user.getTenant_meta().setUser(user3);
           user3.setTenant_meta(user.getTenant_meta());
        }

        return userManager.save(user3);
    }

    @PostMapping("/setPassword") //aktualizowanie uzytkownika
    @PreAuthorize("hasRole('USER') or hasRole('COMPANY')")
    public User setPassword(@RequestBody String password) {
        UserPrinciple user2 = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user3 = userManager.findById(user2.getId()).get();
        user3.setPassword(encoder.encode(password));
        return userManager.save(user3);
    }

    @DeleteMapping("/delete/{index}") //usuwanie usera o danym idexie
    public void deleteUser(@PathVariable Long index) {
        userManager.deleteById(index);
    }

    @GetMapping("/getDetails") //pobiernaie szczegolow usera o danym tokenie
    @PreAuthorize("hasRole('USER') or hasRole('COMPANY')")
    public UserPrinciple getDetails() {
        return (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
    }

    @GetMapping("apartments")
    @PreAuthorize("hasRole('OWNER') or hasRole('TENANT')")
    public Iterable<Apartment> getUserApartments() {
        UserPrinciple up = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User mainUs = userManager.findById(up.getId()).get();
        System.out.println(mainUs.getApartments().toString());
        return mainUs.getApartments();
    }

    @GetMapping("/getInvitations")
    public Iterable<Invitation> getAllInvitations() {
        UserPrinciple up = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User mainUs = userManager.findById(up.getId()).get();
        return mainUs.getInvitations();
    }

}
