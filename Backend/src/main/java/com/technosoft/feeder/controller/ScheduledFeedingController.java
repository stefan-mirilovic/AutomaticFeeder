package com.technosoft.feeder.controller;

import com.technosoft.feeder.dto.ScheduledFeedingDTO;
import com.technosoft.feeder.service.ScheduledFeedingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduledFeedingController {

    @Autowired
    private ScheduledFeedingService scheduledFeedingService;

    @GetMapping
    public ResponseEntity<?> getScheduledFeedings() {
        List<ScheduledFeedingDTO> retVal = null;

        try {
            retVal = this.scheduledFeedingService.getAll();
            return new ResponseEntity<>(retVal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/feed/{amount}")
    public ResponseEntity<?> manualFeeding(@PathVariable int amount) {
        try {
            this.scheduledFeedingService.manualFeed(amount);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ResponseEntity<?> createScheduledFeeding(@RequestBody ScheduledFeedingDTO dto) {
        ScheduledFeedingDTO retVal = null;

        try {
            retVal = this.scheduledFeedingService.create(dto);
            return new ResponseEntity<>(retVal, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateScheduledFeeding(@RequestBody ScheduledFeedingDTO dto) {
        ScheduledFeedingDTO retVal = null;

        try {
            retVal = this.scheduledFeedingService.update(dto);
            return new ResponseEntity<>(retVal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/enable")
    public ResponseEntity<?> updateEnabledScheduledFeeding(@RequestBody ScheduledFeedingDTO dto) {
        ScheduledFeedingDTO retVal = null;

        try {
            retVal = this.scheduledFeedingService.enable(dto);
            return new ResponseEntity<>(retVal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteScheduledFeeding(@PathVariable Long id) {
        ScheduledFeedingDTO retVal = null;

        try {
            retVal = this.scheduledFeedingService.delete(id);
            return new ResponseEntity<>(retVal, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAllScheduledFeedings() {
        try {
            this.scheduledFeedingService.deleteAll();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
