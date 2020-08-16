import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduledFeeding } from 'src/app/model/scheduled-event';
import { faTrashAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons'
import { MatDialog } from '@angular/material/dialog';
import { CreateScheduleDialogComponent } from 'src/app/dialogs/create-schedule-dialog/create-schedule-dialog.component';

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

  constructor(
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
    
  }

  openEditDialog() {
    const dialogRef = this.createDialog.open(CreateScheduleDialogComponent, {
      width: '400px',
      height: '500px',
      data: this.item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
