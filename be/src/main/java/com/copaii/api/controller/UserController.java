package com.copaii.api.controller;

import com.copaii.api.dto.ProviderDto;
import com.copaii.api.dto.UserResponse;
import com.copaii.api.mapper.DataMapper;
import com.copaii.api.repo.UserRepo;
import com.copaii.api.security.LoggedInUser;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    private final DataMapper dataMapper;
    private final UserRepo userRepo;

    public UserController(DataMapper dataMapper, UserRepo userRepo) {
        this.dataMapper = dataMapper;
        this.userRepo = userRepo;
    }

    @GetMapping("me")
    @PreAuthorize("isAuthenticated()")
    public UserResponse getLoggedInUser(@AuthenticationPrincipal LoggedInUser user) {
        return dataMapper.mapToResponse(user);
    }

    @GetMapping("providers")
    @PreAuthorize("isAuthenticated()")
    public List<ProviderDto> getProvidersList() {
        return userRepo.getProvidersList();
    }
}
