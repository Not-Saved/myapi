package it.loris.myapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.loris.myapi.util.Color;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
public class Game {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    private final Date createdAt = new Date();

    @Getter
    @Setter
    private boolean inProgress;

    @Getter
    @Setter
    @OneToOne(orphanRemoval = true)
    private Player winner;

    @Getter
    @OneToOne(cascade = CascadeType.ALL)
    private Player whitePlayer;

    @Getter
    @OneToOne(cascade = CascadeType.ALL)
    private Player blackPlayer;

    @Getter
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private List<Move> moves = new ArrayList<>();

    @JsonIgnore
    public Player getRightPlayer(Color color){
        return (color == Color.WHITE) ? whitePlayer : blackPlayer;
    }

    @JsonIgnore
    public void setRightPlayer(Player player){
       if(player.getColor() == Color.WHITE){
           whitePlayer = player;
       }else if(player.getColor() == Color.BLACK){
           blackPlayer = player;
       }else{
           player.setColor((
                   getAllPlayers().stream().filter(Objects::nonNull).findFirst().get().getColor() == Color.WHITE) ?
                   Color.BLACK : Color.WHITE);
           setRightPlayer(player);
       }
    }

    @JsonIgnore
    public List<Player> getAllPlayers(){
        return Arrays.asList(whitePlayer, blackPlayer);
    }
}
