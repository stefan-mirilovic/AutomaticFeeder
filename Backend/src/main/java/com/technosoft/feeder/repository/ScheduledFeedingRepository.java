package com.technosoft.feeder.repository;

import com.technosoft.feeder.model.ScheduledFeeding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduledFeedingRepository extends JpaRepository<ScheduledFeeding, Long> {

    @Query(value = "select * from scheduled_feeding t order by t.time", nativeQuery = true)
    List<ScheduledFeeding> findAllSortedByTime();
}
