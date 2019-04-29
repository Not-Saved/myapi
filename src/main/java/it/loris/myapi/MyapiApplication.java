package it.loris.myapi;

import it.loris.myapi.entities.User;
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
            userRepo.save(new User("Loris", encoder.encode("Loris")));
            userRepo.save(new User("Sabrina", encoder.encode("Sabrina")));
        };

    }
}