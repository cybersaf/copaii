package com.copaii.api.security;

import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class SecurityUtils {

    public static Optional<LoggedInUser> getLoggedInUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof LoggedInUser) {
            return Optional.of((LoggedInUser) principal);
        }
        return Optional.empty();
    }

    public static Long getLoggedInUserId() {
        return getLoggedInUser().map(LoggedInUser::getId)
                .orElse(0L);
    }
}
