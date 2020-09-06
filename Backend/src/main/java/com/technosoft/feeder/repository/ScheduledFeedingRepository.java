package com.technosoft.feeder.repository;

import com.technosoft.feeder.model.ScheduledFeeding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalTime;
import java.util.List;

public interface ScheduledFeedingRepository extends JpaRepository<ScheduledFeeding, Long> {

    @Query(value = "select * from scheduled_feeding t order by t.time", nativeQuery = true)
    List<ScheduledFeeding> findAllSortedByTime();

    @Query(value = "select * from scheduled_feeding t where t.enabled = true and t.time >= ?1 and t.time <= ?2 order by t.time", nativeQuery = true)
    List<ScheduledFeeding> findEnabledSortedByTime(LocalTime time, LocalTime timeNow);
}
