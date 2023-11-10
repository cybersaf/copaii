package com.copaii.api.configs;

import com.copaii.api.domain.User;
import com.copaii.api.mapper.DataMapper;
import com.copaii.api.security.SecurityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class AuditProvider {

    @Bean
    public AuditorAware<User> auditorAware(DataMapper mapper) {
        return () -> SecurityUtils.getLoggedInUser().map(mapper::mapToEntity);
    }
}