package it.loris.myapi.api;

import it.loris.myapi.enums.Color;
import it.loris.myapi.chess.ChessGame;
import it.loris.myapi.entities.Game;
import it.loris.myapi.entities.Move;
import it.loris.myapi.entities.Player;
import it.loris.myapi.entities.Users;
import it.loris.myapi.repositories.GameRepository;
import it.loris.myapi.repositories.MoveRepository;
import it.loris.myapi.repositories.PlayerRepository;
import it.loris.myapi.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
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
    public ResponseEntity<Iterable<Move>> getAllMoves(@PathVariable("id") Long id) {
        if(gameRepo.findById(id).isPresent()) {
            return new ResponseEntity<>(gameRepo.findById(id).get().getMoves(), HttpStatus.FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping(path = "/{id}/move")
    public HttpStatus postMove(@PathVariable("id") Long id, @RequestParam(value="from") String movingFrom, @RequestParam(value="to") String movingTo, @AuthenticationPrincipal Users users){
        Users myUser = userRepo.findById(users.getId()).get();
        Optional<Game> gameOpt = gameRepo.findById(id);
        if(gameOpt.isPresent()) {
            Game game = gameOpt.get();
            Optional<Player> player = game.getPlayers().stream().filter(myUser.getPlayers()::contains).findFirst();
            if (player.isPresent()) {
                if (checkTurn(game) == player.get().getColor() && game.isInProgress() && game.getPlayers().size() == 2) {
                    if (movingFrom.matches("[a-h][1-8]") && movingTo.matches("[a-h][1-8]")) {
                        Move move = new Move(player.get(), game, movingFrom, movingTo);
                        try{
                            ChessGame.advanceGame(game, move);
                        } catch (IllegalArgumentException exc){
                            log.info(exc.getMessage());
                            return HttpStatus.BAD_REQUEST;
                        }
                        game.getMoves().add(move);
                        moveRepo.save(move);
                        return HttpStatus.CREATED;
                    }
                }
            }
        }
        return HttpStatus.BAD_REQUEST;
    }

    private Color checkTurn(Game game){
        switch (game.getMoves().size()%2){
            case 0: return Color.WHITE;
            default: return Color.BLACK;
        }
    }
}
