package it.loris.chess.api;

import it.loris.chess.chesslogic.ChessGame;
import it.loris.chess.data.entities.Game;
import it.loris.chess.data.entities.Move;
import it.loris.chess.data.entities.MyUser;
import it.loris.chess.data.entities.Player;
import it.loris.chess.data.repositories.GameRepository;
import it.loris.chess.data.repositories.MoveRepository;
import it.loris.chess.data.repositories.PlayerRepository;
import it.loris.chess.data.repositories.UserRepository;
import it.loris.chess.error.exceptions.IllegalRequestParamException;
import it.loris.chess.error.exceptions.ResourceNotFoundException;
import it.loris.chess.util.Enums.Color;
import it.loris.chess.util.Enums.GameState;
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
@RequestMapping(path = "/api/game", produces = "application/json")
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
            return new ResponseEntity<>(gameRepo.findById(id).get().getMoves(), HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Game " +id+ " not found");
    }

    @PostMapping(path = "/{id}/move")
    public ResponseEntity<Object> postMove(
            @PathVariable("id") Long id,
            @AuthenticationPrincipal MyUser users,
            @RequestParam(value="from") String movingFrom,
            @RequestParam(value="to") String movingTo
            ){
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
        if (game.getState() == GameState.NEW) {
            throw new UnauthorizedUserException("Game " + id + " not playable");
        }

        try{
            if (movingFrom.matches("[A-Ha-h][1-8]") && movingTo.matches("[A-Ha-h][1-8]")) {
                Move move = new Move(player.get(), movingFrom, movingTo);
                ChessGame.advanceGame(game, move);
                game.getMoves().add(move);
                game.setTurn(game.getMoves().size()/2 + 1);
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
