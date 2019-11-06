import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  user;
  visits;
  uri = 'http://localhost:5000';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getAll() {
    return this.http.get<any[]>(`${this.uri}/users`);
  }

  getById(id: string) {
    return this.http.get(`${this.uri}/users/${id}`);
  }

  register(user: User) {
    return this.http.post(`${this.uri}/register`, user);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.uri}/login`, {username, password})
      .pipe(map(user => {
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.user = user;
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  update(user: User) {
    return this.http.patch(`${this.uri}/users/${user._id}`, user)
      .pipe(map(resp => {
        return resp;
      }));
  }

  delete(id: number) {
    return this.http.delete(`${this.uri}/users/${id}`);
  }
}
