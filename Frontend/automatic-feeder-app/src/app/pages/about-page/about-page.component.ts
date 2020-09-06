import { Component, OnInit } from '@angular/core';
import { faTwitter, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  twitter = faTwitter
  fb = faFacebookF;
  linkedin = faLinkedinIn;

  constructor() { }

  ngOnInit() {
  }

}
