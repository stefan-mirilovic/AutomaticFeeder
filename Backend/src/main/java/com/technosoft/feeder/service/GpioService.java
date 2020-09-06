package com.technosoft.feeder.service;

import org.springframework.stereotype.Service;

import javax.annotation.PreDestroy;

@Service
public class GpioService {

//    private final GpioController gpio = GpioFactory.getInstance();
//    private final GpioPinDigitalOutput pinA = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_04, "PinA", PinState.LOW);
//    private final GpioPinDigitalOutput pinB = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_17, "PinB");
//    private final GpioPinDigitalOutput pinC = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_27, "PinC");
//    private final GpioPinDigitalOutput pinD = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_22, "PinD");

    public boolean feed(int amount) throws InterruptedException {
        System.out.println("rotate motor clockwise for 3 seconds");
//        pinA.high();
//        pinB.low();
//        pinC.low();
//        pinD.high();
//        // wait 3 seconds
//        Thread.sleep(3000);
//        System.out.println("rotate motor in oposite derection for 6 seconds");
//        pinA.low();
//        pinB.high();
//        pinC.high();
//        pinD.low();
//        // wait 6 seconds
//        Thread.sleep(3000);
//        // stop motor
//        System.out.println("Stopping motor");
//        pinB.low();
//        pinC.low();
        return true;
    }

    @PreDestroy
    public void destroy() {
        System.out.println(
                "Callback triggered - @PreDestroy.");
//        gpio.shutdown();
    }
}
