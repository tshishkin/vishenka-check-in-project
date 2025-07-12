package com.checkin.dao;

import java.util.List;

public interface AbstractDAOInt<T> {
    List<T> getAll();
    T getById();
}
