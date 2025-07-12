package com.checkin.dao;

import com.checkin.enums.Span;
import com.checkin.model.CheckIn;

import java.util.List;

public interface CheckInDAO {
    void create(CheckIn checkIn);

    List<CheckIn> getAll();

    CheckIn getById(Long id);

    List<CheckIn> getAllForTimespan(Span span);

    void delete(long id);
}
