package pl.com.kamienicznik.kamienicznikapp.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Contract;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;
import pl.com.kamienicznik.kamienicznikapp.manager.ContractManager;
import pl.com.kamienicznik.kamienicznikapp.manager.UserManager;
import pl.com.kamienicznik.kamienicznikapp.security.services.UserPrinciple;

@RestController
@RequestMapping("/api/contract")
public class ContractApi {

    private ContractManager contractManager;
    private UserManager userManager;


    @Autowired
    public ContractApi(ContractManager contractManager, UserManager userManager) {
        this.contractManager = contractManager;
        this.userManager = userManager;
    }

    @GetMapping("/getAll")
    public Iterable<Contract> getAll() {
        return contractManager.findAll();
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('OWNER')")
    public Contract addContract(@RequestBody Contract contract) {
        UserPrinciple up = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        contract.setUser(userManager.findById(up.getId()).get());
        return contractManager.save(contract);
    }
}
