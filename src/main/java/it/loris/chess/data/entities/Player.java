package it.loris.chess.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import it.loris.chess.util.Enums.Color;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class Player {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @EqualsAndHashCode.Include
    private final Date createdAt = new Date();

    @EqualsAndHashCode.Include
    private final String username;

    @EqualsAndHashCode.Include
    private Color color;

    @EqualsAndHashCode.Include
    private boolean winner = false;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.MERGE)
    private final MyUser playerUser;

    @JsonBackReference
    @OneToOne(cascade = CascadeType.ALL)
    private final Game game;

    @JsonIgnore
    @EqualsAndHashCode.Include
    @OneToMany(mappedBy = "player")
    private final Set<Move> moves = new HashSet<>();

}
