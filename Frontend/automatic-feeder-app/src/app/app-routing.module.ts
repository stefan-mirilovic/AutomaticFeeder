import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { ButtonPageComponent } from './pages/button-page/button-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: ButtonPageComponent,
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: ButtonPageComponent,
      },
      {
        path: 'schedule',
        component: SchedulePageComponent,
      },
      {
        path: 'about',
        component: AboutPageComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
