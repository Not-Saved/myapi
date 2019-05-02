package it.loris.myapi.api;

import it.loris.myapi.entities.Users;
import it.loris.myapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/users", produces = "application/json")
@CrossOrigin("*")
public class UserController {

    private final UserRepository userRepo;

    @Autowired
    public UserController(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> tacoById(@PathVariable("id") Long id, @AuthenticationPrincipal Users users) {
        Optional<Users> optUser = userRepo.findById(id);
        if (optUser.isPresent() && users.getId() == id) {
            return new ResponseEntity<>(optUser.get(), HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
