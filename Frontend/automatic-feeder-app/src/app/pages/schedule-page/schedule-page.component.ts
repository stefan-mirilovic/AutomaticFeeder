import { Component, OnInit, HostListener } from '@angular/core';
import { faFish, faPlus, faMinus, faCircle, faClock, faEllipsisV, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle, faClock as farClock} from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ScheduledFeeding } from 'src/app/model/scheduled-event';
import { CreateScheduleDialogComponent } from 'src/app/dialogs/create-schedule-dialog/create-schedule-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ScheduledFeedingService } from 'src/app/service/scheduled-feeding.service';

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

  constructor(
    private scheduledFeedingService: ScheduledFeedingService,
    private router: Router,
    private createDialog: MatDialog
    ) { }

  ngOnInit() {
    // this.feedings.push(new ScheduledFeeding(0, new Date("2018-08-15 16:25:30.0"), 6, false));
    // this.feedings.push(new ScheduledFeeding(1, new Date("2018-08-15 17:25:30.0"), 4, false));
    // this.feedings.push(new ScheduledFeeding(2, new Date("2018-08-15 18:25:30.0"), 2, false));
    // this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 19:25:30.0"), 7, false));
    // this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 20:25:30.0"), 7, false));
    // this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 21:25:30.0"), 1, false));
    // this.feedings.push(new ScheduledFeeding(3, new Date("2018-08-15 22:25:30.0"), 8, false));
    this.getAll();
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
    // if (sortedArray.length == 0) {
    //   this.nextTime = null;
    //   return;
    // }
    // let now = new Date();
    // let min : ScheduledFeeding = sortedArray[0];
    // let minHours = +min.time.split(':')[0];
    // let minMinutes = +min.time.split(':')[1];
    // for (let i = 1; i < sortedArray.length; i++) {
    //   let hours = +sortedArray[i].time.split(':')[0];
    //   let minutes = +sortedArray[i].time.split(':')[1];
    //   if (hours - now.getHours() == minHours - now.getHours()) {
    //     if (minutes - now.getMinutes() < minMinutes - now.getMinutes()) {
    //       minHours = hours;
    //       minMinutes = minutes;
    //       min = sortedArray[i];
    //     } else {
    //       continue;
    //     }
    //   } else if (hours - now.getHours() < minHours - now.getHours()) {
    //     minHours = hours;
    //     minMinutes = minutes;
    //     min = sortedArray[i];
    //   } else {
    //     continue;
    //   }
    // }
    // this.nextTime = new Date();
    // this.nextTime.setHours(+min.time.split(':')[0], +min.time.split(':')[1], 0, 0);
    // this.calculateTimeUntil();
    sortedArray.sort((n1,n2)=> this.compareTimeToNow(n1, n2));
    for (let item of sortedArray) {
      if (item.enabled) {
        this.nextTime = new Date();
        this.nextTime.setHours(+item.time.split(':')[0], +item.time.split(':')[1], 0, 0);
        this.calculateTimeUntil();
        return;
      }
    }
    this.nextTime = null;
    return;
  }

  compareTimeToNow(n1: ScheduledFeeding, n2: ScheduledFeeding) {
    let now = new Date();
    // console.log(now.getTime());
    // console.log(n1Time.getTime());
    // console.log(n2Time.getTime());
    let n1Time = new Date();
    let n2Time = new Date();
    // n1Time.setFullYear(now.getFullYear());
    // n1Time.setMonth(now.getMonth());
    // n1Time.setDate(now.getDate());
    // n2Time.setFullYear(now.getFullYear());
    // n2Time.setMonth(now.getMonth());
    // n2Time.setDate(now.getDate());
    n1Time.setHours(+n1.time.split(':')[0], +n1.time.split(':')[1], 0, 0)
    n2Time.setHours(+n2.time.split(':')[0], +n2.time.split(':')[1], 0, 0)

    if (n1Time.getTime() <= now.getTime()) {
      n1Time.setDate(now.getDate() + 1);
    }
    if (n2Time.getTime() <= now.getTime()) {
      n2Time.setDate(now.getDate() + 1);
    }
    if (n1Time.getTime() == n2Time.getTime()) {
      return n1.amount - n2.amount;
    } else if (n1Time.getTime() > n2Time.getTime()) {
      return 1;
    } else if (n1Time.getTime() < n2Time.getTime()) {
      return -1;
    }
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

  openCreateDialog() {
    const dialogRef = this.createDialog.open(CreateScheduleDialogComponent, {
      width: '400px',
      height: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAll();
      }
    })
  }

  getAll() {
    this.scheduledFeedingService.getAll().subscribe({
      next: (result) => {
        this.feedings = result;
        this.changeNextFeeding();
      },
      error: data => {
        if (data.error && typeof data.error === "string")
          console.log(data.error);
        else
          console.log("Could not load schedule.");
      }
    })
  }

  deleteAll() {
    this.scheduledFeedingService.deleteAll().subscribe({
      next: () => {
        this.getAll();
        this.deleteMode = false;
      },
      error: data => {
        if (data.error && typeof data.error === "string")
          console.log(data.error);
        else
          console.log("Could not delete all scheduled feedings.");
      }
    })
  }
}
