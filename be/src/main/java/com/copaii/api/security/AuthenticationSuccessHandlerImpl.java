package com.copaii.api.security;

import com.copaii.api.mapper.DataMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper;
    private final DataMapper dataMapper;

    public AuthenticationSuccessHandlerImpl(ObjectMapper objectMapper, DataMapper dataMapper) {
        this.objectMapper = objectMapper;
        this.dataMapper = dataMapper;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        Object principal = authentication.getPrincipal();
        LoggedInUser user = (LoggedInUser) principal;
        httpServletResponse.setContentType(MediaType.APPLICATION_JSON.toString());
        objectMapper.writeValue(httpServletResponse.getOutputStream(), dataMapper.mapToResponse(user));
    }

}
