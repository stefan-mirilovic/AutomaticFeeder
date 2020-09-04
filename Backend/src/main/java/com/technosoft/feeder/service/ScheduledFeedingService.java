package com.technosoft.feeder.service;

import com.pi4j.io.gpio.GpioController;
import com.pi4j.io.gpio.GpioFactory;
import com.pi4j.io.gpio.GpioPinDigitalOutput;
import com.pi4j.io.gpio.RaspiPin;
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

    public boolean feed(int amount) throws InterruptedException {
        final GpioController gpio = GpioFactory.getInstance();
        final GpioPinDigitalOutput pinA = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_04, "PinA");
        final GpioPinDigitalOutput pinB = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_17, "PinB");
        final GpioPinDigitalOutput pinC = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_27, "PinC");
        final GpioPinDigitalOutput pinD = gpio.provisionDigitalOutputPin(RaspiPin.GPIO_22, "PinD");
        System.out.println("rotate motor clockwise for 3 seconds");
        pinA.high();
        pinB.low();
        pinC.low();
        pinD.high();
        // wait 3 seconds
        Thread.sleep(3000);
        System.out.println("rotate motor in oposite derection for 6 seconds");
        pinA.low();
        pinB.high();
        pinC.high();
        pinD.low();
        // wait 6 seconds
        Thread.sleep(3000);
        // stop motor
        System.out.println("Stopping motor");
        pinB.low();
        pinC.low();
        gpio.shutdown();
        return true;
    }

    public void manualFeed(int amount) throws Exception {
        if (!feed(amount)) {
            throw new Exception("An error occured while feeding!");
        }

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
