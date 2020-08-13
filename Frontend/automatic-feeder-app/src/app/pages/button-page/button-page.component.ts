import { Component, OnInit } from '@angular/core';
import { faFish, faPlus, faMinus, faCircle, faClock, faHome, faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle, faClock as farClock} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-button-page',
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.css']
})
export class ButtonPageComponent implements OnInit {
  faFish = faFish;
  plus = faPlus;
  minus = faMinus;
  clock = faClock;
  home = faHome;
  info = faInfoCircle;
  question = faQuestionCircle;
  circles = [];
  amountNo = 4;

  constructor() { }

  ngOnInit() {
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

}
