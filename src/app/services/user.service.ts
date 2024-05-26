// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.patch(`http://localhost:3000/users/${userId}`, userData);
  }
}
