import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScheduledFeeding } from '../model/scheduled-event';

@Injectable({
  providedIn: 'root'
})
export class ScheduledFeedingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ScheduledFeeding[]> {
    return this.http.get<ScheduledFeeding[]>(`${environment.baseUrl}/${environment.schedule}`);
  }

  create(data: ScheduledFeeding): Observable<ScheduledFeeding> {
    return this.http.post<ScheduledFeeding>(`${environment.baseUrl}/${environment.schedule}`, data);
  }

  update(data: ScheduledFeeding): Observable<ScheduledFeeding> {
    return this.http.put<ScheduledFeeding>(`${environment.baseUrl}/${environment.schedule}`, data);
  }

  enable(data: ScheduledFeeding): Observable<ScheduledFeeding> {
    return this.http.put<ScheduledFeeding>(`${environment.baseUrl}/${environment.schedule}/enable`, data);
  }

  delete(data: ScheduledFeeding) {
    return this.http.delete<ScheduledFeeding>(`${environment.baseUrl}/${environment.schedule}/${data.id}`);
  }

  deleteAll() {
    return this.http.delete<ScheduledFeeding>(`${environment.baseUrl}/${environment.schedule}`);
  }

  manualFeeding(amount: number) {
    return this.http.post<ScheduledFeeding>(`${environment.baseUrl}/${environment.schedule}/feed/${amount}`, null);
  }
}
