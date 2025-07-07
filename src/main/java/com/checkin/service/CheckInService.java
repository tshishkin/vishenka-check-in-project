package com.checkin.service;


import com.checkin.dto.CheckInDTO;
import com.checkin.enums.Span;
import com.checkin.model.CheckIn;

import java.util.List;

public interface CheckInService {
    void create(CheckIn checkIn);

    List<CheckIn> getAll();

    List<CheckInDTO> getAllForSpan(Span span);

    void delete(Long id);
}
