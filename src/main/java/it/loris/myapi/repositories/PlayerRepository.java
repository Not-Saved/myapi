package it.loris.myapi.repositories;

import it.loris.myapi.entities.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player, Long> {
}
