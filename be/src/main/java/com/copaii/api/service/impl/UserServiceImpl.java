package com.copaii.api.service.impl;

import com.copaii.api.dto.UserResponse;
import com.copaii.api.mapper.DataMapper;
import com.copaii.api.repo.UserRepo;
import com.copaii.api.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final DataMapper dataMapper;

    public UserServiceImpl(UserRepo userRepo, DataMapper dataMapper) {
        this.userRepo = userRepo;
        this.dataMapper = dataMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username)
                .map(dataMapper::mapUser)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    @Override
    public Page<UserResponse> findAllUsers(Pageable pageable) {
        return userRepo.findAllUsers(pageable);
    }

}
