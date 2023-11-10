package com.copaii.api.controller;

import com.copaii.api.domain.Request;
import com.copaii.api.dto.RequestDto;
import com.copaii.api.repo.RequestRepo;
import com.copaii.api.security.LoggedInUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@PreAuthorize("hasRole('PATIENT')")
@RequestMapping("api/patient")
public class PatientController {

    private final RequestRepo requestRepo;

    public PatientController(RequestRepo requestRepo) {
        this.requestRepo = requestRepo;
    }

    @GetMapping("requests")
    public Page<RequestDto> getMyRequests(@AuthenticationPrincipal LoggedInUser user, Pageable pageable) {
        return requestRepo.findAllByPatientId(user.getId(), pageable);
    }

    @PostMapping("requests")
    public void createNewRequest(@RequestBody Request request) {
        requestRepo.save(request);
    }

    @PostMapping("requests/{requestId}/cancel")
    public ResponseEntity<?> cancelRequest(@PathVariable Long requestId, @AuthenticationPrincipal LoggedInUser user) {
        Optional<Request> optional = requestRepo.findByIdAndPatientId(requestId, user.getId());
        if (optional.isEmpty()) return ResponseEntity.notFound().build();
        Request request = optional.get();
        if (request.getStatus() == Request.Status.UNAPPROVED || request.getStatus() == Request.Status.APPROVED) {
            request.setStatus(Request.Status.CANCELLED);
            requestRepo.save(request);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().body("Can not cancel request. Request already " + request.getStatus().name().toLowerCase());
        }
    }

}
