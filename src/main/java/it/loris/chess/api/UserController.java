package it.loris.chess.api;

import it.loris.chess.data.entities.MyUser;
import it.loris.chess.data.repositories.PlayerRepository;
import it.loris.chess.data.repositories.UserRepository;
import it.loris.chess.error.exceptions.IllegalRequestParamException;
import it.loris.chess.error.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/user", produces = "application/json")
@CrossOrigin("*")
public class UserController {

    private final PlayerRepository playerRepo;
    private final UserRepository userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    public UserController(PlayerRepository playerRepo, UserRepository userRepo){
        this.userRepo = userRepo;
        this.playerRepo = playerRepo;
    }

    @GetMapping
    public ResponseEntity<Object> getAllUsers() {
        Iterable<MyUser> users = userRepo.findAll();
        return new ResponseEntity<>(users, HttpStatus.FOUND);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable("id") Long id) {
        if(userRepo.findById(id).isPresent()) {
            Optional<MyUser> users = userRepo.findById(id);
            return new ResponseEntity<>(users, HttpStatus.FOUND);
        }
        throw new ResourceNotFoundException("User " +id+ " not found");
    }

    @GetMapping(path = "/me")
    public ResponseEntity<Object> getLoggedUser(@AuthenticationPrincipal MyUser user) {
        return new ResponseEntity<>(user, HttpStatus.FOUND);
    }

    @PostMapping
    public ResponseEntity<Object> registerUser(@RequestParam(value="username") String username, @RequestParam(value = "password") String password){
        if(!userRepo.findByUsername(username.toLowerCase()).isPresent()){
            MyUser myUser = new MyUser(username.toLowerCase().trim(), encoder.encode(password));
            myUser.setRole("USER");
            userRepo.save(myUser);
            return new ResponseEntity<>(myUser, HttpStatus.CREATED);
        }
        throw new IllegalRequestParamException("User with username:  " +username+ " already exists");
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Object> deleteUserById(@PathVariable("id") Long id){
        if(userRepo.findById(id).isPresent()){
            userRepo.delete(userRepo.findById(id).get());
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        throw new ResourceNotFoundException("User " +id+ " not found");
    }
}
