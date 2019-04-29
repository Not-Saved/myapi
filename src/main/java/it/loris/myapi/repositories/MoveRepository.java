package it.loris.myapi.repositories;

import it.loris.myapi.entities.Move;
import org.springframework.data.repository.CrudRepository;

public interface MoveRepository extends CrudRepository<Move, Long> {
}
