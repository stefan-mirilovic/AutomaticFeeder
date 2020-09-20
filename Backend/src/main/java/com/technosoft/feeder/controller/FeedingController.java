package com.technosoft.feeder.controller;

import com.technosoft.feeder.service.FeedingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/feeding")
public class FeedingController {

    @Autowired
    private FeedingService feedingService;

    @PostMapping(value = "/{amount}")
    public ResponseEntity<?> manualFeeding(@PathVariable int amount) {
        try {
            this.feedingService.manualFeed(amount);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
