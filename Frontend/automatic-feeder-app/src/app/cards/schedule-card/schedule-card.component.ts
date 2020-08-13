import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduledFeeding } from 'src/app/model/scheduled-event';
import { faTrashAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'schedule-card',
  templateUrl: './schedule-card.component.html',
  styleUrls: ['./schedule-card.component.css']
})
export class ScheduleCardComponent implements OnInit {
  @Input()
  item: ScheduledFeeding;
  @Input()
  deleteMode: boolean;
  @Output()
  enabledChanged = new EventEmitter();
  trash = faTrashAlt;
  circles = [];

  constructor() { }

  ngOnInit() {
    this.adjustDots();
  }

  adjustDots() {
    let altCircles = [];
    for (let i = 0; i < this.item.amount; i++) {
      altCircles.push(faCircle);
    }
    for (let i = this.item.amount; i < 8; i++) {
      altCircles.push(farCircle);
    }
    this.circles = altCircles;
  }

}
