package it.loris.chess.repositories;

import it.loris.chess.entities.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface PlayerRepository extends CrudRepository<Player, Long> {
    Set<Player> findByPlayerUserId(Long id);
}
