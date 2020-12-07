package pl.com.kamienicznik.kamienicznikapp.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.com.kamienicznik.kamienicznikapp.dao.ApartmentRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Apartment;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Contract;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;

import java.util.Optional;

@Service
public class ApartmentManager {
    private ApartmentRepo apartmentRepo;

    @Autowired
    public ApartmentManager(ApartmentRepo apartmentRepo) {
        this.apartmentRepo = apartmentRepo;
    }

    public Optional<Apartment> findById(Long id) {
        return apartmentRepo.findById(id);
    }

    public Iterable<Apartment> findAll() {
        return apartmentRepo.findAll();
    }

    public Apartment save(Apartment apartment) {
        return apartmentRepo.save(apartment);
    }

    public void delete(Apartment apartment) {
        apartmentRepo.delete(apartment);
    }

    public void deleteById(Long id) {
        apartmentRepo.deleteById(id);
    }

    public void addUserToApartment(User user) {

    }
}
