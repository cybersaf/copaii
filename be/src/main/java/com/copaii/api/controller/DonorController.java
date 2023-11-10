package com.copaii.api.controller;

import com.copaii.api.domain.Request;
import com.copaii.api.dto.RequestDto;
import com.copaii.api.mapper.DataMapper;
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

import java.util.Optional;

@RestController
@PreAuthorize("hasRole('DONOR')")
@RequestMapping("api/donor")
public class DonorController {

    private final RequestRepo requestRepo;
    private final DataMapper dataMapper;

    public DonorController(RequestRepo requestRepo, DataMapper dataMapper) {
        this.requestRepo = requestRepo;
        this.dataMapper = dataMapper;
    }

    @GetMapping("requests/approved")
    public Page<RequestDto> getApprovedRequests(Pageable pageable) {
        return requestRepo.findAllByStatus(Request.Status.APPROVED, pageable);
    }

    @GetMapping("requests/funded")
    public Page<RequestDto> getAllRequestsFundedByMe(@AuthenticationPrincipal LoggedInUser user, Pageable pageable) {
        return requestRepo.findAllByDonorIdAndStatus(user.getId(), Request.Status.FUNDED, pageable);
    }

    @PostMapping("requests/{requestId}/pay")
    public ResponseEntity<?> payRequest(@PathVariable Long requestId, @AuthenticationPrincipal LoggedInUser user) {
        Optional<Request> optional = requestRepo.findById(requestId);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();
        Request request = optional.get();
        if (request.getStatus() == Request.Status.APPROVED) {
            request.setDonor(dataMapper.mapToEntity(user));
            request.setStatus(Request.Status.FUNDED);
            requestRepo.save(request);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().body("Can not pay request. Status: " + request.getStatus());
        }
    }

}
