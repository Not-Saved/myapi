package it.loris.chess.repositories;

import it.loris.chess.entities.Move;
import org.springframework.data.repository.CrudRepository;

public interface MoveRepository extends CrudRepository<Move, Long> {
}
