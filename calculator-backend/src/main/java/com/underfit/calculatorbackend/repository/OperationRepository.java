package com.underfit.calculatorbackend.repository;

import com.underfit.calculatorbackend.entity.Operations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OperationRepository extends JpaRepository<Operations, Long> {
    List<Operations> findAllByOperationsDateTimeBetweenAndOperationTypeAndFirstNumSystemAndSecondNumSystem(
            LocalDateTime from, LocalDateTime to, String operation, String firstNumSystem, String secondNumSystem);
}