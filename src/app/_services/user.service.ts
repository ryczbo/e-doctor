import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  getByType(userType: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/${userType}`);
  }

  register(user: User) {
    user.lastLogged = new Array<string>();
    user.visits = [];
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  update(user: User) {
    console.log('jest');
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
