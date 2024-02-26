package com.underfit.calculatorbackend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@ToString
@Table(name = "operations")
public class Operations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "operation_type", nullable = false)
    private String operationType;

    @Column(name = "first_num_system", nullable = false)
    private String firstNumSystem;

    @Column(name = "first_num", nullable = false)
    private String firstNum;

    @Column(name = "second_num_system", nullable = false)
    private String secondNumSystem;

    @Column(name = "second_num", nullable = false)
    private String secondNum;

    @Column(name = "result", nullable = false)
    private String result;

    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @Column(name = "operations_date_time", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime operationsDateTime;
}