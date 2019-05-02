package it.loris.myapi.repositories;

import it.loris.myapi.entities.Users;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Users, Long> {
    Users findByUsername(String username);
}
