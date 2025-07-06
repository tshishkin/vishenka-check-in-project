package com.checkin.controller;

import com.checkin.dto.CheckInDTO;
import com.checkin.enums.Span;
import com.checkin.model.CheckIn;
import com.checkin.service.CheckInService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/check-in")
public class CheckInController {

    private final CheckInService checkInService;

    public CheckInController(CheckInService checkInService) {
        this.checkInService = checkInService;
    }

    @PostMapping
    public Long createCheckIn(@RequestBody CheckIn checkIn) {
        return checkInService.create(checkIn);
    }

    @GetMapping("/{span}")
    public List<CheckInDTO> getAllForSpan(@PathVariable Span span) {
        return checkInService.getAllForSpan(span);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        checkInService.delete(id);
    }
}
