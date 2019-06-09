package it.loris.chess.data.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import it.loris.chess.api.json.View;
import it.loris.chess.util.Enums.Color;
import it.loris.chess.util.Enums.GameState;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class Game {

    @Id
    @JsonView(View.Summary.class)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @JsonView(View.Summary.class)
    private final Date createdAt = new Date();

    @JsonView(View.Summary.class)
    private GameState state = GameState.NEW;

    @JsonView(View.Summary.class)
    private int turn = 1;

    @JsonView(View.Summary.class)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "game", fetch = FetchType.EAGER)
    private Set<Player> players = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Move> moves = new HashSet<>();

    @JsonIgnore
    public void setRightPlayer(Player player){
        player.setColor((players.stream().anyMatch(p -> p.getColor() == Color.WHITE)) ? Color.BLACK : Color.WHITE);
    }
}