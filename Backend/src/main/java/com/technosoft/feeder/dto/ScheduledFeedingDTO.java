package com.technosoft.feeder.dto;

public class ScheduledFeedingDTO {

    public Long id;
    public String time;
    public int amount;
    public boolean enabled;

    public ScheduledFeedingDTO() {
    }

    public ScheduledFeedingDTO(Long id, String time, int amount, boolean enabled) {
        this.id = id;
        this.time = time;
        this.amount = amount;
        this.enabled = enabled;
    }
}
