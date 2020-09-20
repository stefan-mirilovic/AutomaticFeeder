package com.technosoft.feeder.service;

import com.pi4j.io.gpio.*;
import org.springframework.stereotype.Service;

import javax.annotation.PreDestroy;

@Service
public class GpioService {

    private final GpioController gpio = GpioFactory.getInstance();
    private final GpioPinDigitalOutput pin = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_00, "PinA", PinState.HIGH);

    public GpioService() {
        pin.setShutdownOptions(false, PinState.HIGH);
    }

    public boolean feed(int amount) throws InterruptedException {
        System.out.println("Rotating motor for " + amount + " seconds");
        pin.low();
        Thread.sleep(amount * 1000);
        System.out.println("Stopping motor");
        pin.high();
        return true;
    }

    @PreDestroy
    public void destroy() {
        System.out.println(
                "GPIO shutting down.");
        gpio.shutdown();
    }
}
