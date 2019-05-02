package it.loris.myapi;

import it.loris.myapi.entities.Users;
import it.loris.myapi.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MyapiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyapiApplication.class, args);
    }

    @Bean
    public CommandLineRunner dataLoader(UserRepository userRepo, PasswordEncoder encoder){
        return args -> {
            if (!userRepo.findById((long)1).isPresent()) {
                userRepo.save(new Users("Loris", encoder.encode("Loris")));
                userRepo.save(new Users("Sabrina", encoder.encode("Sabrina")));
            }
        };
    }
}