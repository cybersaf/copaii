package com.copaii.api.repo;

import com.copaii.api.domain.Request;
import com.copaii.api.dto.RequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RequestRepo extends JpaRepository<Request, Long> {
    Page<RequestDto> findAllByPatientId(Long patientId, Pageable pageable);

    Page<RequestDto> findAllByStatus(Request.Status status, Pageable pageable);

    Page<RequestDto> findAllByDonorIdAndStatus(Long donorId, Request.Status status, Pageable pageable);

    Page<RequestDto> findAllByProviderIdAndStatusIn(Long providerId, List<Request.Status> unapproved, Pageable pageable);

    Optional<Request> findByIdAndProviderId(Long requestId, Long providerId);

    Optional<Request> findByIdAndPatientId(Long requestId, Long patientId);
}
