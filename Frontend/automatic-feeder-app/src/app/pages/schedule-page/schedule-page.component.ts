import { Component, OnInit } from '@angular/core';
import { faFish, faPlus, faMinus, faEllipsisV, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faClock as farClock} from '@fortawesome/free-regular-svg-icons';
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
    private createDialog: MatDialog
    ) { }

  ngOnInit() {
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
    let n1Time = new Date();
    let n2Time = new Date();
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
  }

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
