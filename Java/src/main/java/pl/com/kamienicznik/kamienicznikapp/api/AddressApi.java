package pl.com.kamienicznik.kamienicznikapp.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Address;
import pl.com.kamienicznik.kamienicznikapp.manager.AddressManager;
import pl.com.kamienicznik.kamienicznikapp.manager.UserManager;

@RestController
@RequestMapping("api/address")
public class AddressApi {
    private AddressManager addressManager;
    private UserManager userManager;

    @Autowired
    public AddressApi(AddressManager addressManager, UserManager userManager) {
        this.addressManager = addressManager;
        this.userManager = userManager;
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('OWNER')")
    public Address addAddress(@RequestBody Address address) {
        return addressManager.save(address);
    }
}
