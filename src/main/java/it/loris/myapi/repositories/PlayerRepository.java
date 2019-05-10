package it.loris.myapi.repositories;

import it.loris.myapi.entities.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface PlayerRepository extends CrudRepository<Player, Long> {
    Set<Player> findByPlayerUserId(Long id);
}
