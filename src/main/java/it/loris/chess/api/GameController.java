package it.loris.chess.api;

import com.fasterxml.jackson.annotation.JsonView;
import it.loris.chess.api.json.View;
import it.loris.chess.data.entities.Game;
import it.loris.chess.data.entities.MyUser;
import it.loris.chess.data.entities.Player;
import it.loris.chess.data.repositories.GameRepository;
import it.loris.chess.data.repositories.MoveRepository;
import it.loris.chess.data.repositories.PlayerRepository;
import it.loris.chess.data.repositories.UserRepository;
import it.loris.chess.error.exceptions.ResourceNotFoundException;
import it.loris.chess.util.Enums.Color;
import it.loris.chess.util.Enums.GameState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.common.exceptions.UnauthorizedUserException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/**/game", produces = "application/json")
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

    @JsonView(View.Summary.class)
    @GetMapping
    public ResponseEntity<Object> getAllGames(
            @AuthenticationPrincipal  MyUser user,
            @RequestParam(value="mine", defaultValue = "false") boolean mine,
            @RequestParam(value="state", required = false) GameState state)
    {
        MyUser myUser = userRepo.findById(user.getId()).get();
        if(mine) {
            List<Game> games = playerRepo.findByPlayerUserId(myUser.getId())
                    .stream()
                    .map(Player::getGame)
                    .filter(g -> (state != null) ? g.getState() == state : true)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(games, HttpStatus.FOUND);
        } else {
            List<Game> games = gameRepo.findFirst30ByCreatedAtBeforeOrderByCreatedAt(new Date())
                    .stream()
                    .filter(g -> (state != null) ? g.getState() == state : true)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(games, HttpStatus.FOUND);
        }
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<Object> getGame(@PathVariable("id") Long id){
        if(gameRepo.findById(id).isPresent()){
            return new ResponseEntity<>(gameRepo.findById(id), HttpStatus.FOUND);
        }
        throw new ResourceNotFoundException("Game " +id+ " not found");
    }

    @PostMapping
    public ResponseEntity<Object> postGame(
            @RequestParam(value="color", defaultValue = "WHITE") Color color,
            @AuthenticationPrincipal MyUser myUser)
    {
        if(playerRepo.findByPlayerUserId(myUser.getId())
                .stream()
                .map(Player::getGame)
                .filter(g-> g.getState() == GameState.NEW)
                .count() < 10)
        {
            MyUser user = userRepo.findById(myUser.getId()).get();
            Game game = new Game();

            Player player = new Player(myUser.getUsername(), user, game);
            player.setColor(color);
            game.getPlayers().add(player);

            gameRepo.save(game);
            return new ResponseEntity<>(game, HttpStatus.CREATED);
        }
       throw new UnauthorizedUserException("User is already participating in 10 games");
    }

    @PostMapping("/{id}")
    public ResponseEntity<Object> postPlayer(@PathVariable("id") Long id, @AuthenticationPrincipal MyUser myUser){
        Optional<Game> optGame = gameRepo.findById(id);
        MyUser user = userRepo.findById(myUser.getId()).get();
        if(gameRepo.findById(id).isPresent()){
            Game game = optGame.get();
            if(game.getPlayers().stream().filter(Objects::nonNull).count() >= 2){
                throw new UnauthorizedUserException("game: " +game.getId()+ " is already full");
            }
            if(game.getPlayers().stream().anyMatch(user.getPlayers()::contains)){
                throw new UnauthorizedUserException("User is already participating in game " +game.getId());
            }
            game.setState(GameState.IN_PROGRESS);

            Player player = new Player(myUser.getUsername(), user, game);
            game.setRightPlayer(player);
            game.getPlayers().add(player);

            gameRepo.save(game);
            return new ResponseEntity<>(game, HttpStatus.ACCEPTED);
        }
        throw new ResourceNotFoundException("Game " +id+ " not found");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGame(@PathVariable("id") Long id){
        if(gameRepo.findById(id).isPresent()){
            gameRepo.delete(gameRepo.findById(id).get());
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        throw new ResourceNotFoundException("Game " +id+ " not found");
    }
}