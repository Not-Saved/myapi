package it.loris.myapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.loris.myapi.util.MoveType;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class Move {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private final Player player;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private final Game game;

    private final Date createdAt = new Date();
    private MoveType moveType;
    private final String movingFrom;
    private final String movingTo;

}
