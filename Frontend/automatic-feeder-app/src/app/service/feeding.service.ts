import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedingService {
  baseUrl = window.location.href.split(":")[0] + ":" + window.location.href.split(":")[1];
  constructor(private http: HttpClient) { }

  manualFeeding(amount: number) {
    return this.http.post<boolean>(`${this.baseUrl}${environment.baseUrl}/${environment.feeding}/${amount}`, null);
  }
}
