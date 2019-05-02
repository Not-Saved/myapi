package it.loris.myapi.api;

import it.loris.myapi.entities.Users;
import it.loris.myapi.entities.Game;
import it.loris.myapi.entities.Move;
import it.loris.myapi.entities.Player;
import it.loris.myapi.repositories.GameRepository;
import it.loris.myapi.repositories.MoveRepository;
import it.loris.myapi.repositories.PlayerRepository;
import it.loris.myapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/game", produces = "application/json")
@CrossOrigin("*")
public class MoveController {

    private final GameRepository gameRepo;
    private final UserRepository userRepo;
    private final MoveRepository moveRepo;

    @Autowired
    public MoveController(GameRepository gameRepo, UserRepository userRepo, PlayerRepository playerRepo, MoveRepository moveRepo){
        this.gameRepo = gameRepo;
        this.userRepo = userRepo;
        this.moveRepo = moveRepo;
    }

    @GetMapping(path = "/{id}/move")
    public Iterable<Move> getAllMoves(@PathVariable("id") Long id) {
        return gameRepo.findById(id).get().getMoves();
    }

    @PostMapping(path = "/{id}/move")
    public HttpStatus postMove(@PathVariable("id") Long id, @RequestParam(value="move") String moveName, @AuthenticationPrincipal Users users){
        Users myUser = userRepo.findById(users.getId()).get();
        Game game = gameRepo.findById(id).get();
        Optional<Player> player = game.getPlayers().stream().filter(myUser.getPlayers()::contains).findFirst();
        if (player.isPresent()) {
            if (checkTurn(game) == player.get().getColor()){
                Move move = new Move(player.get(), game, moveName);
                game.getMoves().add(move);
                moveRepo.save(move);
                return HttpStatus.CREATED;
            }
        }
        return HttpStatus.BAD_REQUEST;
    }

    private Player.Color checkTurn(Game game){
        switch (game.getMoves().size()%2){
            case 0: return Player.Color.WHITE;
            default: return Player.Color.BLACK;
        }
    }
}
