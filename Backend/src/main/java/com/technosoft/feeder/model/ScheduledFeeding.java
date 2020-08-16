package com.technosoft.feeder.model;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "scheduled_feeding")
public class ScheduledFeeding {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private LocalTime time;

    @Column
    private int amount;

    @Column
    private boolean enabled;

    public ScheduledFeeding() {
    }

    public ScheduledFeeding(LocalTime time, int amount, boolean enabled) {
        this.time = time;
        this.amount = amount;
        this.enabled = enabled;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
