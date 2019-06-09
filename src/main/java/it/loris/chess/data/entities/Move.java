package it.loris.chess.data.entities;

import it.loris.chess.util.Enums.MoveType;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@EqualsAndHashCode(exclude = "player")
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE, force = true)
public class Move {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private final Date createdAt = new Date();

    @ManyToOne(cascade = CascadeType.ALL)
    private final Player player;

    private MoveType moveType;
    private final String movingFrom;
    private final String movingTo;
}