package com.copaii.api.controller;

import com.copaii.api.domain.User;
import com.copaii.api.dto.RegistrationRequest;
import com.copaii.api.mapper.DataMapper;
import com.copaii.api.repo.UserRepo;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
@RequestMapping("api/auth")
public class RegistrationController {

    private final DataMapper dataMapper;
    private final UserRepo userRepo;

    public RegistrationController(DataMapper dataMapper, UserRepo userRepo) {
        this.dataMapper = dataMapper;
        this.userRepo = userRepo;
    }

    @PostMapping("register")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void register(@RequestBody @Valid RegistrationRequest request) {
        User user = dataMapper.mapToUser(request);
        if (userRepo.findByUsername(request.getEmail().trim()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }
        userRepo.save(user);
    }
}
