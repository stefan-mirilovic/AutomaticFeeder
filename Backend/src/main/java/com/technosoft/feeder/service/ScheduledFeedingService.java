package com.technosoft.feeder.service;

import com.technosoft.feeder.dto.ScheduledFeedingDTO;
import com.technosoft.feeder.mapper.ScheduledFeedingMapper;
import com.technosoft.feeder.model.ScheduledFeeding;
import com.technosoft.feeder.repository.ScheduledFeedingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduledFeedingService {

    private ScheduledFeedingMapper mapper;

    @Autowired
    private ScheduledFeedingRepository repository;

    public ScheduledFeedingService() {
        mapper = new ScheduledFeedingMapper();
    }

    public List<ScheduledFeedingDTO> getAll() {
        List<ScheduledFeedingDTO> retVal = new ArrayList<>();
        for (ScheduledFeeding sf: repository.findAllSortedByTime()) {
            retVal.add(mapper.toDto(sf));
        }
        return retVal;
    }

    public ScheduledFeedingDTO create(ScheduledFeedingDTO dto) {
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public ScheduledFeedingDTO update(ScheduledFeedingDTO dto) throws Exception {
        ScheduledFeeding entity = repository.findById(dto.id).orElseThrow(() -> new Exception("Scheduled feeding not found"));
        entity.setTime(LocalTime.parse(dto.time));
        entity.setAmount(dto.amount);
        entity.setEnabled(true);
        return mapper.toDto(repository.save(entity));
    }

    public ScheduledFeedingDTO enable(ScheduledFeedingDTO dto) throws Exception {
        ScheduledFeeding entity = repository.findById(dto.id).orElseThrow(() -> new Exception("Scheduled feeding not found"));
        entity.setEnabled(dto.enabled);
        return mapper.toDto(repository.save(entity));
    }

    public ScheduledFeedingDTO delete(Long id) throws Exception {
        ScheduledFeeding entity = repository.findById(id).orElseThrow(() -> new Exception("Scheduled feeding not found"));
        repository.delete(entity);
        return mapper.toDto(entity);
    }

    public void deleteAll() {
        repository.deleteAll();
    }
}
