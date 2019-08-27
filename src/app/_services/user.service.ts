import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import {environment} from '../../environments/environment';
import {first} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  allPatients;
  visits;

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getAllPatients() {
  return this.getAll().pipe(first()).subscribe(patients => {
      this.allPatients = patients.filter(e => e.userType === 'Patient');
    })
  };

  filterVisits(user: User) {
    this.visits = [];
    let name = user.firstName + ' ' + user.lastName;
    for (let i = 0; i < this.allPatients.length; i++) {
      for (let j = 0; j < this.allPatients[i].visits.length; j++) {
        if (this.allPatients[i].visits[j].doctorName === name) {
          this.visits.push(this.allPatients[i].visits[j]);
        }
      }
    }
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
