package it.loris.myapi.repositories;

import it.loris.myapi.entities.MyUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<MyUser, Long> {
    Optional<MyUser> findByUsername(String username);
}
