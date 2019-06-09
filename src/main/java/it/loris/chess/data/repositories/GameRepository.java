package it.loris.chess.data.repositories;

import it.loris.chess.data.entities.Game;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.Set;

public interface GameRepository extends CrudRepository<Game, Long> {

    Set<Game> findFirst30ByCreatedAtBeforeOrderByCreatedAt(Date date);

}
