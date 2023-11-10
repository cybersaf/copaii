package com.copaii.api.service;

import com.copaii.api.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Page<UserResponse> findAllUsers(Pageable pageable);
}
