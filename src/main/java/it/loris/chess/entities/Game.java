package it.loris.chess.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.loris.chess.util.Color;
import lombok.Data;

import javax.persistence.*;
import java.util.*;

@Data
@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private final Date createdAt = new Date();

    private boolean inProgress;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "game", fetch = FetchType.EAGER)
    private List<Player> players = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Move> moves = new ArrayList<>();

    @JsonIgnore
    public void setRightPlayer(Player player){
        player.setColor((players.stream().anyMatch(p -> p.getColor() == Color.WHITE)) ? Color.BLACK : Color.WHITE);
    }

}
