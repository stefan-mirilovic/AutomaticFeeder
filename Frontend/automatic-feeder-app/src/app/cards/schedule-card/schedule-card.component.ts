import { Component, OnInit, Input } from '@angular/core';
import { ScheduledEvent } from 'src/app/model/scheduled-event';

@Component({
  selector: 'app-schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent implements OnInit {
  @Input()
  item: ScheduledEvent;

  constructor() { }

  ngOnInit() {
  }

}
