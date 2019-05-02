package it.loris.myapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    private final String username;

    private final Color color;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Users users;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private Game game;

    @OneToMany(mappedBy = "player")
    @JsonIgnore
    private List<Move> moves;

    public enum Color{
        WHITE, BLACK;
    }
}
