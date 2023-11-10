package com.copaii.api.dto;

import com.copaii.api.domain.Request;

import java.time.LocalDate;

public interface RequestDto {
    Long getId();

    LocalDate getRequestDate();

    String getRequestId();

    UserInfo getProvider();

    UserInfo getPatient();

    UserInfo getDonor();

    Integer getAmount();

    Request.Status getStatus();

    interface UserInfo {
//        Long getId();

        String getFirstName();

        String getLastName();
    }
}
