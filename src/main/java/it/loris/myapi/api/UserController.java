package it.loris.myapi.api;

import it.loris.myapi.entities.Users;
import it.loris.myapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users", produces = "application/json")
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;

    @Autowired
    public UserController(UserRepository userRepo, PasswordEncoder encoder){
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable("id") Long id, @AuthenticationPrincipal Users users) {
        Optional<Users> optUser = userRepo.findById(id);
        if (optUser.isPresent() && users.getId() == id) {
            return new ResponseEntity<>(optUser.get(), HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping
    public HttpStatus registerUser(@PathParam(value="username") String username, @PathParam(value = "password") String password){
        if(!userRepo.findByUsername(username.toLowerCase()).isPresent()){
            userRepo.save(new Users(username.toLowerCase(), encoder.encode(password)));
            return HttpStatus.CREATED;
        }
        return HttpStatus.BAD_REQUEST;
    }
}
