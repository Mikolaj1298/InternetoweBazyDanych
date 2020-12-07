package pl.com.kamienicznik.kamienicznikapp.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.com.kamienicznik.kamienicznikapp.dao.RoleRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.UserRepo;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.Role;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.RoleName;
import pl.com.kamienicznik.kamienicznikapp.dao.entity.User;
import pl.com.kamienicznik.kamienicznikapp.mail.MailController;
import pl.com.kamienicznik.kamienicznikapp.message.request.LoginForm;
import pl.com.kamienicznik.kamienicznikapp.message.request.SignUpForm;
import pl.com.kamienicznik.kamienicznikapp.message.response.JwtResponse;
import pl.com.kamienicznik.kamienicznikapp.message.response.ResponseMessage;
import pl.com.kamienicznik.kamienicznikapp.security.jwt.JwtProvider;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthApi {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepository;

    @Autowired
    RoleRepo roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    MailController mailController;

    @CrossOrigin(origins = "http://localhost:2000")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @CrossOrigin(origins = "http://localhost:2000")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getEmail(), signUpRequest.getType(),
                signUpRequest.getTenant_meta(), signUpRequest.getOwner_meta(), signUpRequest.getFirstName(),
                signUpRequest.getLastName(), signUpRequest.getPhoneNumber());
        if (user.getType() == 1)
            user.getOwner_meta().setUser(user);
        else if (user.getType() == 0)
            user.getTenant_meta().setUser(user);
        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        strRoles.forEach(role -> {
            switch (role) {
                case "owner":
                    Role ownerRole = roleRepository.findByName(RoleName.ROLE_OWNER)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found." + RoleName.ROLE_OWNER));
                    roles.add(ownerRole);

                    break;
                default:
                    Role tenantRole = roleRepository.findByName(RoleName.ROLE_TENANT)
                            .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not found." + RoleName.ROLE_TENANT));
                    roles.add(tenantRole);
            }
        });

        user.setRoles(roles);
        userRepository.save(user);

        mailController.sendSignupEmail(user.getUsername(), user.getEmail());
        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }
}
