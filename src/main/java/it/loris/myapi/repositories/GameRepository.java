package it.loris.myapi.repositories;

import it.loris.myapi.entities.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Long> {
}
