import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduledFeeding } from 'src/app/model/scheduled-event';
import { faTrashAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleDialogComponent } from 'src/app/dialogs/create-schedule-dialog/create-schedule-dialog.component';
import { ScheduledFeedingService } from 'src/app/service/scheduled-feeding.service';

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
  @Output()
  reload = new EventEmitter();
  trash = faTrashAlt;
  circles = [];

  constructor(
    private scheduledFeedingService: ScheduledFeedingService,
    private createDialog: MatDialog
  ) { }

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

  delete() {
    this.scheduledFeedingService.delete(this.item).subscribe({
      next: () => {
        this.reload.emit();
      },
      error: data => {
        if (data.error && typeof data.error === "string")
          console.log(data.error);
        else
          console.log("Could not delete scheduled feeding.");
      }
    })
  }

  openEditDialog() {
    const dialogRef = this.createDialog.open(CreateScheduleDialogComponent, {
      width: '400px',
      height: '500px',
      data: this.item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload.emit();
      }
    })
  }

  enable() {
    this.scheduledFeedingService.enable(this.item).subscribe({
      next: () => {
        this.enabledChanged.emit();
      },
      error: data => {
        if (data.error && typeof data.error === "string")
          console.log(data.error);
        else
          console.log("Could not enable scheduled feeding.");
      }
    })
  }

}
