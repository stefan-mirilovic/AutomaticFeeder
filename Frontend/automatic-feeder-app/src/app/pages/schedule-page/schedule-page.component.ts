import { Component, OnInit } from '@angular/core';
import { faFish, faPlus, faMinus, faCircle, faClock } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle, faClock as farClock} from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ScheduledFeeding } from 'src/app/model/scheduled-event';

@Component({
  selector: 'schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.css']
})
export class SchedulePageComponent implements OnInit {
  faFish = faFish;
  plus = faPlus;
  minus = faMinus;
  clock = farClock;
  circles = [];
  amountNo = 4;
  feedings = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.feedings.push(new ScheduledFeeding(0, new Date(), 6, true));
  }

}
