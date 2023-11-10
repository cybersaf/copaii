package com.copaii.api.repo;

import com.copaii.api.domain.User;
import com.copaii.api.dto.ProviderDto;
import com.copaii.api.dto.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("select new com.copaii.api.dto.UserResponse(u.id, u.username, u.firstName, u.lastName, u.role) from User u")
    Page<UserResponse> findAllUsers(Pageable pageable);

    @Query("select u.id as id, u.firstName as name from User u where u.role = 'PROVIDER'")
    List<ProviderDto> getProvidersList();
}
