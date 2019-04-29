package it.loris.myapi.api;

import it.loris.myapi.entities.Game;
import it.loris.myapi.entities.Move;
import it.loris.myapi.entities.Player;
import it.loris.myapi.entities.User;
import it.loris.myapi.repositories.GameRepository;
import it.loris.myapi.repositories.MoveRepository;
import it.loris.myapi.repositories.PlayerRepository;
import it.loris.myapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    public Optional<Game> getGame(@PathVariable("id") Long id){
        return gameRepo.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void postGame(@RequestParam(value="color") Color color, @AuthenticationPrincipal User user){
        Game game = new Game();
        game.setCreatedAt(new Date());
        saveDetails(user, game, color);
    }

    @PostMapping("/{id}")
    public HttpStatus postPlayer(@PathVariable("id") Long id, @RequestParam(value="color") Color color, @AuthenticationPrincipal User user){
        if(gameRepo.findById(id).isPresent()){
            Game game = gameRepo.findById(id).get();
            User myUser = userRepo.findById(user.getId()).get();
            if(game.getPlayers().stream().noneMatch(p -> p.getColor() == color || p.getUser() == myUser)){
                saveDetails(user, game, color);
                return HttpStatus.ACCEPTED;
            }
        }
        return HttpStatus.BAD_REQUEST;
    }

    public void saveDetails(User user, Game game, Color color){
        User myUser = userRepo.findById(user.getId()).get();
        Player player = new Player(myUser.getUsername(), color);
        player.setUser(myUser);
        player.setGame(game);
        myUser.getGames().add(game);
        playerRepo.save(player);
    }
}
