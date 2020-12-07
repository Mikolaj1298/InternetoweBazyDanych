package pl.com.kamienicznik.kamienicznikapp.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Address;

@Repository
public interface AddressRepo extends CrudRepository<Address, Long> {
}
