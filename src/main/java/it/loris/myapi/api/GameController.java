package it.loris.myapi.api;

import it.loris.myapi.entities.Game;
import it.loris.myapi.entities.Player;
import it.loris.myapi.entities.Users;
import it.loris.myapi.repositories.GameRepository;
import it.loris.myapi.repositories.MoveRepository;
import it.loris.myapi.repositories.PlayerRepository;
import it.loris.myapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static it.loris.myapi.entities.Player.Color;

@RestController
@RequestMapping(path = "/game", produces = "application/json")
@CrossOrigin("*")
public class GameController {

    private final GameRepository gameRepo;
    private final UserRepository userRepo;
    private final PlayerRepository playerRepo;

    @Autowired
    public GameController(GameRepository gameRepo, UserRepository userRepo, PlayerRepository playerRepo, MoveRepository moveRepo){
        this.gameRepo = gameRepo;
        this.userRepo = userRepo;
        this.playerRepo = playerRepo;
    }

    @GetMapping(produces="application/json")
    public Iterable<Game> getAllGames(){
        return gameRepo.findAll();
    }

    @GetMapping(path="/{id}", produces = "application/json")
    public ResponseEntity<Optional<Game>> getGame(@PathVariable("id") Long id){
        if(gameRepo.findById(id).isPresent()){
            return new ResponseEntity<>(gameRepo.findById(id), HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void postGame(@RequestParam(value="color") Color color, @AuthenticationPrincipal Users users){
        Game game = new Game();
        saveDetails(users, game, color);
    }

    @PostMapping("/{id}")
    public HttpStatus postPlayer(@PathVariable("id") Long id, @RequestParam(value="color") Color color, @AuthenticationPrincipal Users users){
        if(gameRepo.findById(id).isPresent()){
            Game game = gameRepo.findById(id).get();
            Users myUser = userRepo.findById(users.getId()).get();
            if(game.getPlayers().stream().noneMatch(p -> p.getColor() == color || p.getUsers() == myUser)){
                saveDetails(users, game, color);
                return HttpStatus.ACCEPTED;
            }
        }
        return HttpStatus.BAD_REQUEST;
    }

    private void saveDetails(Users users, Game game, Color color){
        Users myUser = userRepo.findById(users.getId()).get();
        Player player = new Player(myUser.getUsername(), color);
        player.setUsers(myUser);
        player.setGame(game);
        myUser.getGames().add(game);
        playerRepo.save(player);
    }
}
