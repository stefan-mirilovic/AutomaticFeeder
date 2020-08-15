import { Component, OnInit, HostListener } from '@angular/core';
import { faFish, faPlus, faMinus, faCircle, faClock, faEllipsisV, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
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
  feedings = Array<ScheduledFeeding>();
  nextTime: Date;
  timeUntilNext: Date;
  ellipsisv = faEllipsisV;
  trash = faTrashAlt;
  deleteMode = false;
  isSticky: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.feedings.push(new ScheduledFeeding(0, new Date("2018-08-15 16:25:30.0"), 6, false));
    this.feedings.push(new ScheduledFeeding(1, new Date("2018-08-15 17:25:30.0"), 4, false));
    this.feedings.push(new ScheduledFeeding(2, new Date("2018-08-15 18:25:30.0"), 2, false));
    this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 19:25:30.0"), 7, false));
    this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 20:25:30.0"), 7, false));
    this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 21:25:30.0"), 1, false));
    this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 22:25:30.0"), 8, false));
    setInterval(() => {
      if (this.nextTime != null) {
        this.calculateTimeUntil();
      }
    }, 60000);
  }

  calculateTimeUntil() {
    let until = new Date();
    until.setHours(this.nextTime.getHours() - new Date().getHours());
    until.setMinutes(this.nextTime.getMinutes() - new Date().getMinutes());
    this.timeUntilNext = until;
    if (this.timeUntilNext.getHours() == 0 && this.timeUntilNext.getMinutes() == 0) {
      this.changeNextFeeding();
    }
  }

  anyEnabled() {
    for (let f of this.feedings) {
      if (f.enabled) {
        return true;
      }
    }
    return false;
  }

  changeNextFeeding() {
    let sortedArray = [];
    for (let f of this.feedings) {
      if (f.enabled) {
        sortedArray.push(f);
      }
    }
    sortedArray.sort((n1,n2)=> this.compareTimeToNow(n1, n2));
    for (let item of sortedArray) {
      if (item.enabled) {
        this.nextTime = item.time;
        // this.nextTime.setDate(new Date().getDate() + 1);
        this.calculateTimeUntil();
        return;
      }
    }
    this.nextTime = null;
    return;
  }

  compareTime(n1: ScheduledFeeding, n2: ScheduledFeeding) {
    if (n1.time.getTime() == n2.time.getTime()) {
      return n1.amount - n2.amount;
    } else if (n1.time.getTime() < n2.time.getTime()) {
      return 1;
    } else if (n1.time.getTime() > n2.time.getTime()) {
      return -1;
    }
  }

  compareTimeToNow(n1: ScheduledFeeding, n2: ScheduledFeeding) {
    let now = new Date();
    // console.log(now.getTime());
    // console.log(n1.time.getTime());
    // console.log(n2.time.getTime());
    n1.time.setFullYear(now.getFullYear());
    n1.time.setMonth(now.getMonth());
    n1.time.setDate(now.getDate());
    n2.time.setFullYear(now.getFullYear());
    n2.time.setMonth(now.getMonth());
    n2.time.setDate(now.getDate());

    if (n1.time.getTime() <= now.getTime()) {
      n1.time.setDate(now.getDate() + 1);
    }
    if (n2.time.getTime() <= now.getTime()) {
      n2.time.setDate(now.getDate() + 1);
    }
    if (n1.time.getTime() == n2.time.getTime()) {
      return n1.amount - n2.amount;
    } else if (n1.time.getTime() > n2.time.getTime()) {
      return 1;
    } else if (n1.time.getTime() < n2.time.getTime()) {
      return -1;
    }
    // let n1Hours = n1.time.getHours();
    // if (n1Hours)
    // if (n1.time.getHours() == n2.time.getHours()) {

    // } else if (now.getHours() - n1.time.getHours() < now.getHours() - n2.time.getHours()) {
    //   return 1;
    // } else if (now.getHours() - n1.time.getHours() > now.getHours() - n2.time.getHours()) {
    //   return -1;
    // }
  }

  changeDeleteMode() {
    this.deleteMode = !this.deleteMode;
    if (this.deleteMode) {
      this.trash = faTimes;
    } else {
      this.trash = faTrashAlt;
    }
    // this.deleteMode ? this.trash = faTrashAlt : this.trash = faTimes
  }

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   this.isSticky = window.pageYOffset >= 250;
  // }

}
