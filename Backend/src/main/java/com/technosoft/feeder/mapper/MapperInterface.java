package com.technosoft.feeder.mapper;

public interface MapperInterface<T, U> {

    T toEntity(U dto);

    U toDto(T entity);

}
