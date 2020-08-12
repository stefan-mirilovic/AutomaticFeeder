import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'schedule',
    component: SchedulePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
