package com.copaii.api.mapper;

import com.copaii.api.domain.User;
import com.copaii.api.dto.RegistrationRequest;
import com.copaii.api.dto.UserResponse;
import com.copaii.api.security.LoggedInUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class DataMapper {

    private final PasswordEncoder passwordEncoder;

    public DataMapper(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public LoggedInUser mapUser(User source) {
        LoggedInUser user = new LoggedInUser();
        user.setId(source.getId());
        user.setUsername(source.getUsername());
        user.setFirstName(source.getFirstName());
        user.setLastName(source.getLastName());
        user.setPassword(source.getPassword());
        user.setRole(source.getRole());
        return user;
    }

    public UserResponse mapToResponse(LoggedInUser user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getRole());
    }

    public User mapToEntity(LoggedInUser user) {
        User entity = new User();
        entity.setId(user.getId());
        entity.setUsername(user.getUsername());
        return entity;
    }

    public User mapToUser(RegistrationRequest request) {
        if (request.getRole() == User.Role.PROVIDER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Can not register provider");
        }
        User user = new User();
        user.setUsername(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return user;
    }
}
