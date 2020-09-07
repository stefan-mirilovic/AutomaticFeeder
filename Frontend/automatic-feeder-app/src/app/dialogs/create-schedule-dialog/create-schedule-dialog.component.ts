import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faChevronCircleUp, faChevronCircleDown, faCircle, faChevronUp, faChevronDown, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { ScheduledFeeding } from 'src/app/model/scheduled-event';
import { ScheduledFeedingService } from 'src/app/service/scheduled-feeding.service';

@Component({
  selector: 'app-create-schedule-dialog',
  templateUrl: './create-schedule-dialog.component.html',
  styleUrls: ['./create-schedule-dialog.component.css']
})
export class CreateScheduleDialogComponent implements OnInit {
  up = faChevronUp;
  down = faChevronDown;
  plus = faPlus;
  minus = faMinus;
  hours: number = 0;
  minutes: number = 0;
  circles = [];
  amountNo = 4;
  submitButtonText: string = 'Create';
  editMode: boolean;
  loading: boolean;

  constructor(
    public scheduledFeedingService: ScheduledFeedingService,
    public dialogRef: MatDialogRef<CreateScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScheduledFeeding
  ) { }

  ngOnInit() {
    if (this.data.amount) {
      this.amountNo = this.data.amount;
      // this.hours = new Date(this.data.time).getHours();
      // this.minutes = new Date(this.data.time).getMinutes();
      this.hours = +(this.data.time.split(':')[0]);
      this.minutes = +(this.data.time.split(':')[1]);
      this.submitButtonText = 'Save';
      this.editMode = true;
    } else {
      this.editMode = false;
      let now = new Date();
      this.hours = now.getHours();
      let rem = now.getMinutes() % 5;
      if (rem < 3) {
        this.minutes = now.getMinutes() - rem;
      } else {
        this.minutes = now.getMinutes() + 5 - rem;
        if (this.minutes <= 60) {
          this.minutes = 0;
          this.hours = this.hours + 1;
          if (this.hours <= 24) {
            this.hours = 0;
          }
        }
      }
    }

    this.adjustDots();
  }

  adjustDots() {
    let altCircles = [];
    for (let i = 0; i < this.amountNo; i++) {
      altCircles.push(faCircle);
    }
    for (let i = this.amountNo; i < 8; i++) {
      altCircles.push(farCircle);
    }
    this.circles = altCircles;
  }

  incAmount() {
    if (this.amountNo == 8) {
      return;
    }
    this.amountNo++;
    this.adjustDots();
  }

  decAmount() {
    if (this.amountNo == 1) {
      return;
    }
    this.amountNo--;
    this.adjustDots();
  }

  incHours() {
    if (this.hours >= 23) {
      this.hours = 0;
    } else {
      this.hours = this.hours + 1;
    }
  }

  decHours() {
    if (this.hours <= 0) {
      this.hours = 26;
    } else {
      this.hours = this.hours - 1;
    }
  }

  incMinutes() {
    if (this.minutes >= 55) {
      this.minutes = 0;
    } else {
      this.minutes = this.minutes + 5;
    }
  }

  decMinutes() {
    if (this.minutes <= 0) {
      this.minutes = 55;
    } else {
      this.minutes = this.minutes - 5;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create() {
    this.loading = true;
    if (!this.editMode) {
      let time = new Date();
      time.setHours(this.hours);
      time.setMinutes(this.minutes);
      let schedule = new ScheduledFeeding(null, time.toLocaleTimeString('en-GB'), this.amountNo, true);
      // let schedule = new ScheduledFeeding(null, `${ this.hours }:${ this.minutes }:0`, this.amountNo, true);
      this.scheduledFeedingService.create(schedule).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: data => {
          this.loading = false;
          if (data.error && typeof data.error === "string")
            console.log(data.error);
          else
            console.log("Could not create scheduled feeding.");
        }
      })
    } else {
      let time = new Date();
      time.setHours(this.hours);
      time.setMinutes(this.minutes);
      let schedule = new ScheduledFeeding(this.data.id, time.toLocaleTimeString('en-GB'), this.amountNo, true);
      this.scheduledFeedingService.update(schedule).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: data => {
          this.loading = false;
          if (data.error && typeof data.error === "string")
            console.log(data.error);
          else
            console.log("Could not create scheduled feeding.");
        }
      })
    }
  }
}
