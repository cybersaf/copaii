package com.copaii.api.controller;

import com.copaii.api.domain.Request;
import com.copaii.api.dto.RequestDto;
import com.copaii.api.repo.RequestRepo;
import com.copaii.api.security.LoggedInUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.copaii.api.domain.Request.Status;

@RestController
@PreAuthorize("hasRole('PROVIDER')")
@RequestMapping("api/provider")
public class ProviderController {

    private final RequestRepo requestRepo;

    public ProviderController(RequestRepo requestRepo) {
        this.requestRepo = requestRepo;
    }

    @GetMapping("requests")
    public Page<RequestDto> getAllRequests(@AuthenticationPrincipal LoggedInUser user, Pageable pageable) {
        return requestRepo.findAllByProviderIdAndStatusIn(user.getId(), List.of(Status.APPROVED, Status.UNAPPROVED), pageable);
    }

    @PostMapping("requests/{requestId}/approve")
    public ResponseEntity<?> approveRequest(@PathVariable Long requestId, @AuthenticationPrincipal LoggedInUser user) {
        Optional<Request> optional = requestRepo.findByIdAndProviderId(requestId, user.getId());
        if (optional.isEmpty()) return ResponseEntity.notFound().build();
        Request request = optional.get();
        if (request.getStatus() == Status.UNAPPROVED) {
            request.setStatus(Status.APPROVED);
            requestRepo.save(request);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().body("Can not approve request. Status: " + request.getStatus());
        }
    }

}
