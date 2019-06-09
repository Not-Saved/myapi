package it.loris.chess.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.loris.chess.util.Enums.Color;
import it.loris.chess.util.Enums.GameState;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private final Date createdAt = new Date();

    private GameState state = GameState.NEW;

    private int turn = 1;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "game", fetch = FetchType.EAGER)
    private Set<Player> players = new HashSet<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Move> moves = new HashSet<>();

    @JsonIgnore
    public void setRightPlayer(Player player){
        player.setColor((players.stream().anyMatch(p -> p.getColor() == Color.WHITE)) ? Color.BLACK : Color.WHITE);
    }

}
