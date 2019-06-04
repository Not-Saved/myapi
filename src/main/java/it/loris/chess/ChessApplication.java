package it.loris.chess;

import it.loris.chess.entities.MyUser;
import it.loris.chess.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ChessApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(ChessApplication.class, args);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Bean
    public CommandLineRunner dataLoader(UserRepository userRepo, PasswordEncoder encoder){
        return args -> {
            if (!userRepo.findById((long)1).isPresent()) {
                MyUser loris = new MyUser("loris", encoder.encode("sirol"));
                loris.setRole("ADMIN");
                userRepo.save(loris);
                MyUser sabrina = new MyUser("sabrina", encoder.encode("sabrina"));
                sabrina.setRole("USER");
                userRepo.save(sabrina);
            }
        };
    }


}