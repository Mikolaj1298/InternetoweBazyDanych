package pl.com.kamienicznik.kamienicznikapp.api;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.com.kamienicznik.kamienicznikapp.security.services.UserPrinciple;

@RestController
@RequestMapping("/test")
public class TestApi {

    @GetMapping("/start") //zwracanie wszystkich ofert
    public String testAll() {
        UserPrinciple up = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        System.out.println(up.getUsername());
        return up.getUsername();
    }
}
