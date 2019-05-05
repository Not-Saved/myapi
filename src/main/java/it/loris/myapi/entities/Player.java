package it.loris.myapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE )
    private Long id;

    private final Date createdAt = new Date();
    private final String username;
    private final Color color;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    private Users users;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonIgnore
    private Game game;

    @OneToMany(mappedBy = "player")
    @JsonIgnore
    private List<Move> moves;

    public enum Color{WHITE, BLACK}
}
