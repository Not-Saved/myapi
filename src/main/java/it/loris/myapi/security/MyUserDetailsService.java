package it.loris.myapi.security;

import it.loris.myapi.entities.MyUser;
import it.loris.myapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    @Autowired
    public MyUserDetailsService(UserRepository userRepo){
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<MyUser> users = userRepo.findByUsername(username);
        if(users.isPresent()){
            return users.get();
        }
        throw new UsernameNotFoundException("MyUser '" + username + "' not found");
    }
}
