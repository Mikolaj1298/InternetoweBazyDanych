package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.AddressRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Address;

import java.util.Optional;

@Service
public class AddressManager {

    private AddressRepo addressRepo;

    @Autowired
    public AddressManager(AddressRepo addressRepo) {
        this.addressRepo = addressRepo;
    }

    public Address save(Address address) {
        return addressRepo.save(address);
    }

    public Iterable<Address> findAll() {
        return addressRepo.findAll();
    }

    public Optional<Address> findById(Long id) {
        return this.addressRepo.findById(id);
    }

    public void test() {
        System.out.println("Works fine");
    }
}
