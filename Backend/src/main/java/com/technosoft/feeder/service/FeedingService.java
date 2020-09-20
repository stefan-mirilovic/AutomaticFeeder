package com.technosoft.feeder.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedingService {

    @Autowired
    private GpioService gpioService;

    public void manualFeed(int amount) throws Exception {
        if (!gpioService.feed(amount)) {
            throw new Exception("An error occured while feeding!");
        }
    }
}
