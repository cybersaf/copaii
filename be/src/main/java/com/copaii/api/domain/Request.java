package com.copaii.api.domain;

import com.copaii.api.utils.HashUtils;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    private LocalDate requestDate;

    private String requestId;

    @CreatedBy
    @ManyToOne(optional = false)
    private User patient;

    @ManyToOne
    private User donor;

    @ManyToOne
    private User provider;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false, insertable = false)
    @ColumnDefault("'UNAPPROVED'")
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        UNAPPROVED, APPROVED, FUNDED, CANCELLED
    }

    @PrePersist
    public void generateId() {
        if (requestId == null) {
            requestId = HashUtils.generateHash(UUID.randomUUID().toString());
        }
    }
}
