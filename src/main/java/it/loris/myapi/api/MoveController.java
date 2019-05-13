package it.loris.myapi.api;

import it.loris.myapi.entities.MyUser;
import it.loris.myapi.util.Color;
import it.loris.myapi.chess.ChessGame;
import it.loris.myapi.entities.Game;
import it.loris.myapi.entities.Move;
import it.loris.myapi.entities.Player;
import it.loris.myapi.util.IllegalRequestParamException;
import it.loris.myapi.util.ResourceNotFoundException;
import it.loris.myapi.repositories.GameRepository;
import it.loris.myapi.repositories.MoveRepository;
import it.loris.myapi.repositories.PlayerRepository;
import it.loris.myapi.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.common.exceptions.UnauthorizedUserException;
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
    public ResponseEntity<Object> getAllMoves(@PathVariable("id") Long id) {
        if(gameRepo.findById(id).isPresent()) {
            return new ResponseEntity<>(gameRepo.findById(id).get().getMoves(), HttpStatus.FOUND);
        }
        throw new ResourceNotFoundException("Game " +id+ " not found");
    }

    @PostMapping(path = "/{id}/move")
    public ResponseEntity<Object> postMove(@PathVariable("id") Long id, @RequestParam(value="from") String movingFrom, @RequestParam(value="to") String movingTo, @AuthenticationPrincipal MyUser users){
        MyUser myUser = userRepo.findById(users.getId()).get();
        Optional<Game> gameOpt = gameRepo.findById(id);

        if (!gameOpt.isPresent()) {
            throw new ResourceNotFoundException("Game " + id + " not found");
        }
        Game game = gameOpt.get();

        Optional<Player> player = game.getPlayers().stream().filter(myUser.getPlayers()::contains).findFirst();
        if (!player.isPresent()) {
            throw new UnauthorizedUserException("User not participating in game " + game.getId());
        }
        if (!(checkTurn(game) == player.get().getColor())) {
            throw new UnauthorizedUserException("Invalid move: can't move during opponent's turn");
        }
        if (!game.isInProgress()) {
            throw new UnauthorizedUserException("Game " + id + " not playable");
        }

        try{
            if (movingFrom.matches("[A-Ha-h][1-8]") && movingTo.matches("[A-Ha-h][1-8]")) {
                Move move = new Move(player.get(), game, movingFrom, movingTo);
                ChessGame.advanceGame(game, move);
                game.getMoves().add(move);
                moveRepo.save(move);
                return new ResponseEntity<>(move, HttpStatus.ACCEPTED);
            }
            throw new IllegalArgumentException("Invalid move: illegal move arguments");
        } catch (IllegalArgumentException exc) {
            log.info(exc.getMessage());
            throw new IllegalRequestParamException(exc.getMessage());
        }
    }

    private Color checkTurn(Game game){
        return (game.getMoves().size()%2 == 0) ? Color.WHITE : Color.BLACK;
    }
}
