package pl.com.kamienicznik.kamienicznikapp.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Apartment;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;
import pl.com.kamienicznik.kamienicznikapp.manager.AddressManager;
import pl.com.kamienicznik.kamienicznikapp.manager.ApartmentManager;
import pl.com.kamienicznik.kamienicznikapp.manager.UserManager;
import pl.com.kamienicznik.kamienicznikapp.security.services.UserPrinciple;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("api/apartment")
public class ApartmentApi {

    private ApartmentManager apartmentManager;
    private UserManager userManager;
    private AddressManager addressManager;

    @Autowired
    public ApartmentApi(ApartmentManager apartmentManager, UserManager userManager, AddressManager addressManager) {
        this.apartmentManager = apartmentManager;
        this.userManager = userManager;
        this.addressManager = addressManager;
    }

    @GetMapping("/getAll")
    public Iterable<Apartment> getAll() {
        return this.apartmentManager.findAll();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('OWNER')")
    public Apartment addApartment(@RequestBody Apartment apartment) {

        UserPrinciple userPrinciple = (UserPrinciple) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        Set<User> userSet = new HashSet<>();
        User actualUser = this.userManager.findById(userPrinciple.getId()).get();
        userSet.add(actualUser);
        apartment.setUsers(userSet);

        apartmentManager.save(apartment);
        return apartment;
    }

    @GetMapping("/users")
    public Iterable<User> getApartmentUsers(@RequestParam Long id) {
        System.out.println(id);
        Apartment apartment = apartmentManager.findById(id).get();
//        Set<User> userSet = apartment.getUsers();
//        System.out.println(userSet.size());
//        System.out.println(userSet);

//        Optional<User> first = userSet.stream().findFirst();
//        System.out.println(first.get().toString());
//        User us = userSet.iterator().next();
//        System.out.println(us.toString());

//        Apartment mainAp = apartmentManager.findById(24L).get();
//        System.out.println(mainAp.getUsers().toString());
        System.out.println(apartment.getUsers());
        return apartment.getUsers();
    }

    @PostMapping("/addUser")
    public void addUserToApartment(@RequestBody Long userId,
                                             @RequestParam Long id) {
        System.out.println(userId);
        Apartment apartment = apartmentManager.findById(id).get();
        apartment.addUser(userManager.findById(userId).get());
        apartmentManager.save(apartment);
        System.out.println("Zwrcam apartament");
//        return apartment;
    }

    @GetMapping("/getById")
    public Apartment getApartmentById(@RequestParam Long id) {
        return apartmentManager.findById(id).get();
    }
}