import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { ScheduleCardComponent } from './cards/schedule-card/schedule-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SchedulePageComponent,
    ScheduleCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
