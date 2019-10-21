import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../../_models/user';
import {environment} from '../../../environments/environment';
import {first, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegisterService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  user;
  allPatients;
  visits;
  uri = 'http://localhost:5000';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getAll() {
    return this.http.get<any[]>(`${this.uri}/users`);
  }

  // getAllPatients() {
  //   return this.getAll().pipe(first()).subscribe(patients => {
  //     this.allPatients = patients.filter(e => e.userType === 'Patient');
  //   });
  // }

  // filterVisits(user: User) {
  //   this.visits = [];
  //   let name = user.firstName + ' ' + user.lastName;
  //   for (let i = 0; i < this.allPatients.length; i++) {
  //     for (let j = 0; j < this.allPatients[i].visits.length; j++) {
  //       if (this.allPatients[i].visits[j].doctorName === name) {
  //         this.visits.push(this.allPatients[i].visits[j]);
  //       }
  //     }
  //   }
  // }

  getById(id: string) {
    return this.http.get(`${this.uri}/users/${id}`);
  }

  getByType(userType: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/${userType}`);
  }

  register(user: User) {
    return this.http.post(`${this.uri}/register`, user);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.uri}/login`, {username, password})
      .pipe(map(user => {
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
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
    return this.http.patch(`${this.uri}/users/${user._id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  // filterVisits(user) {
  //   let name = user.firstName + ' ' + user.lastName;
  //   for (let i = 0; i < this.allPatientsList.length; i++){
  //     for (let j = 0; j < this.allPatientsList[i].visits.length; j++) {
  //       if (this.allPatientsList[i].visits[j].userName === name) {
  //         this.visits.push(this.allPatientsList[i].visits[j]);
  //       }
  //     }
  //   }
  // }
}
