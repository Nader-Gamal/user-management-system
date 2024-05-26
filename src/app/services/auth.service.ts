import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service'; // Correct import path

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<{
    isLoggedIn: boolean;
    role: string;
  }>({
    isLoggedIn: this.isLoggedIn(),
    role: this.getUserRole(),
  });
  authState = this.authStateSubject.asObservable();
  apiUrl = 'http://localhost:3000/users';

  constructor(
    private _HttpClient: HttpClient,
    private _LoaderService: LoaderService
  ) {}

  getAll(): Observable<any> {
    return this.withLoader(this._HttpClient.get(this.apiUrl));
  }

  getByCode(code: any): Observable<any> {
    return this.withLoader(this._HttpClient.get(this.apiUrl + '/' + code));
  }

  processRegistration(inputData: any): Observable<any> {
    return this.withLoader(this._HttpClient.post(this.apiUrl, inputData));
  }

  updateUser(code: any, inputData: any): Observable<any> {
    return this.withLoader(
      this._HttpClient.patch(this.apiUrl + '/' + code, inputData)
    );
  }

  deleteUser(code: any): Observable<any> {
    return this.withLoader(this._HttpClient.delete(this.apiUrl + '/' + code));
  }

  login(username: string, password: string): Observable<any> {
    return this.withLoader(
      this._HttpClient
        .get<any>(`${this.apiUrl}?id=${username}&password=${password}`)
        .pipe(
          tap((user) => {
            if (user && user.length) {
              sessionStorage.setItem('username', username);
              sessionStorage.setItem('role', user[0].role);
              this.authStateSubject.next({
                isLoggedIn: true,
                role: user[0].role,
              });
            }
          })
        )
    );
  }

  logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    this.authStateSubject.next({ isLoggedIn: false, role: '' });
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('username') != null;
  }

  getUserRole(): string {
    return sessionStorage.getItem('role') || '';
  }

  private withLoader<T>(observable: Observable<T>): Observable<T> {
    this._LoaderService.show();
    return observable.pipe(
      switchMap((response) => of(response).pipe(delay(1))), // Ensure loader stays for at least 3 seconds
      tap(() => this._LoaderService.hide()),
      catchError((error: HttpErrorResponse) => {
        this._LoaderService.hide();
        // Handle error accordingly
        console.error('HTTP error occurred:', error);
        return throwError(error);
      })
    );
  }
}
