package com.underfit.calculatorbackend.dto;

import com.underfit.calculatorbackend.entity.Operations;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link Operations}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OperationsFilterDto implements Serializable {
    private String operationType;
    private String firstNumSystem;
    private String secondNumSystem;
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    //@JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss")
    private LocalDateTime fromDateTime;
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    //@JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss")
    private LocalDateTime toDateTime;
}