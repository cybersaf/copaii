package com.copaii.api.dto;

import com.copaii.api.domain.User;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private User.Role role;

    public UserResponse(Long id, String username, String firstName, String lastName, User.Role role) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}
