package com.checkin.dao;

import com.checkin.enums.Span;
import com.checkin.model.CheckIn;

import java.util.List;

public interface CheckInDAO {
    void create(List<CheckIn> checkIn);

    List<CheckIn> getAll();

    List<CheckIn> getAllForTimespan(Span span);

    void delete(long id);
}
