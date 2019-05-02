package it.loris.myapi.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    private Date createdAt;

    @OneToMany(mappedBy = "game")
    private List<Player> players = new ArrayList<>();

    @OneToMany
    private List<Move> moves;
}
