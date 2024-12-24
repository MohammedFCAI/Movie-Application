import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient) { }


  userData: any;

  loginForm(userData: Object): Observable<any> {
    return this._httpClient.post('http://localhost:8080/movie-app/auth/login', userData);
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserFormData(): any {
    const user = localStorage.getItem('formData');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('formData');
  }
}
