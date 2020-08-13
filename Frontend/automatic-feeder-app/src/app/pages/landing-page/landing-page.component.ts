import { Component, OnInit } from '@angular/core';
import { faClock, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  clock = faClock;
  home = faHome;
  info = faInfoCircle;
  time = new Date();

  constructor() { }

  ngOnInit() {
      setInterval(() => {
        this.time = new Date();
      }, 1000);
  }
}
