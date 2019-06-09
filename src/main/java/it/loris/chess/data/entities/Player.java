package it.loris.chess.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import it.loris.chess.api.json.View;
import it.loris.chess.util.Enums.Color;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class Player {

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonView(View.Summary.class)
    private Long id;

    @EqualsAndHashCode.Include
    @JsonView(View.Summary.class)
    private final Date createdAt = new Date();

    @EqualsAndHashCode.Include
    @JsonView(View.Summary.class)
    private final String username;

    @EqualsAndHashCode.Include
    @JsonView(View.Summary.class)
    private Color color;

    @EqualsAndHashCode.Include
    @JsonView(View.Summary.class)
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
