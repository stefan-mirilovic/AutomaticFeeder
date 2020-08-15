import { Component, OnInit } from '@angular/core';
import { faClock, faHome, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
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
  bars = faBars;
  time = new Date();
  currPage: string;

  constructor(private router: Router) { }

  ngOnInit() {
    // setInterval(() => {
    //   this.time = new Date();
    // }, 1000);
  }
}
