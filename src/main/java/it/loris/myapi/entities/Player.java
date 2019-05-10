package it.loris.myapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import it.loris.myapi.util.Color;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private final Date createdAt = new Date();
    private final String username;
    private Color color;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    private final MyUser playerUser;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private final Game game;

    @OneToMany(mappedBy = "player")
    @JsonIgnore
    private final List<Move> moves = new ArrayList<>();

}
