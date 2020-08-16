package com.technosoft.feeder.mapper;

import com.technosoft.feeder.dto.ScheduledFeedingDTO;
import com.technosoft.feeder.model.ScheduledFeeding;

import java.time.LocalTime;

public class ScheduledFeedingMapper implements MapperInterface<ScheduledFeeding, ScheduledFeedingDTO> {
    @Override
    public ScheduledFeeding toEntity(ScheduledFeedingDTO dto) {
        return new ScheduledFeeding(LocalTime.parse(dto.time), dto.amount, dto.enabled);
    }

    @Override
    public ScheduledFeedingDTO toDto(ScheduledFeeding entity) {
        return new ScheduledFeedingDTO(entity.getId(), entity.getTime().toString(), entity.getAmount(), entity.isEnabled());
    }
}
