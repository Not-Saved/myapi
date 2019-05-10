package it.loris.myapi.api;

import it.loris.myapi.entities.Game;
import it.loris.myapi.entities.MyUser;
import it.loris.myapi.repositories.PlayerRepository;
import it.loris.myapi.repositories.UserRepository;
import it.loris.myapi.util.IllegalRequestParamException;
import it.loris.myapi.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/user", produces = "application/json")
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
    public ResponseEntity<Object> getUserById() {
        Iterable<MyUser> users = userRepo.findAll();
        return new ResponseEntity<>(users, HttpStatus.FOUND);
    }

    @GetMapping(path = "/{id}/game")
    public ResponseEntity<Object> getUsersGames(@PathVariable("id") Long id, @AuthenticationPrincipal MyUser myUser) {
        if(userRepo.findById(id).isPresent()){
            Iterable<Game> games = playerRepo.findByPlayerUserId(id).stream().map(p -> p.getGame()).collect(Collectors.toList());
            return new ResponseEntity<>(games, HttpStatus.FOUND);
        }
        throw new ResourceNotFoundException("User with id: " +id+ " not found");
    }

    @PostMapping
    public ResponseEntity<Object> registerUser(@RequestParam(value="username") String username, @RequestParam(value = "password") String password){
        if(!userRepo.findByUsername(username.toLowerCase()).isPresent()){
            MyUser myUser = new MyUser(username.toLowerCase(), encoder.encode(password));
            myUser.setRole("USER");
            userRepo.save(myUser);
            return new ResponseEntity<>(myUser, HttpStatus.CREATED);
        }
        throw new IllegalRequestParamException("User: " +username+ " already exists");
    }
}
