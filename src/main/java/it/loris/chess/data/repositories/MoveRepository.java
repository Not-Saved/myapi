package it.loris.chess.data.repositories;

import it.loris.chess.data.entities.Move;
import org.springframework.data.repository.CrudRepository;

public interface MoveRepository extends CrudRepository<Move, Long> {
}
