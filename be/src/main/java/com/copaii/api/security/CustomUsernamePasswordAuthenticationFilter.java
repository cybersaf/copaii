package com.copaii.api.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class CustomUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final ObjectMapper mapper;

    public CustomUsernamePasswordAuthenticationFilter(ObjectMapper mapper, AuthenticationSuccessHandler successHandler) {
        this.mapper = mapper;
        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/auth/login"));
        setAuthenticationSuccessHandler(successHandler);
        setAuthenticationFailureHandler((req, res, ex) -> res.sendError(401, ex.getMessage()));
        super.setUsernameParameter("email");
    }

    @Override
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username;
        String password;
        JsonNode jsonNode = mapper.readTree(request.getReader());
        username = jsonNode.get(getUsernameParameter()).asText();
        password = jsonNode.get(getPasswordParameter()).asText();
        var authRequest = new UsernamePasswordAuthenticationToken(username == null ? "" : username.trim(), password == null ? "" : password);
        this.setDetails(request, authRequest);
        return this.getAuthenticationManager().authenticate(authRequest);
    }
}
