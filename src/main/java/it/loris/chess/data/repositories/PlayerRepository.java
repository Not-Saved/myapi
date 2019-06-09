package it.loris.chess.data.repositories;

import it.loris.chess.data.entities.Player;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface PlayerRepository extends CrudRepository<Player, Long> {
    Set<Player> findByPlayerUserId(Long id);
}
