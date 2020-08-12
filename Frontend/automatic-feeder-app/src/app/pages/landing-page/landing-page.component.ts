import { Component, OnInit } from '@angular/core';
import { faFish } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  faFish = faFish;

  constructor() { }

  ngOnInit() {
  }

}
