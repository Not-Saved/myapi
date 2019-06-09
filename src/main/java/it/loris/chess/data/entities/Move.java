package it.loris.chess.data.entities;

import it.loris.chess.util.Enums.MoveType;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@EqualsAndHashCode(exclude = "player")
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
@RequiredArgsConstructor
public class Move {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private final Player player;

    private final Date createdAt = new Date();

    private MoveType moveType;
    private final String movingFrom;
    private final String movingTo;

}
