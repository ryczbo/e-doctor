import { Component, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  public user: User;
  profilePicB64;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
) {
  this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    this.currentUser = user;
  });
}

  ngOnInit() {
  }

  handleFileSelect(evt) {
    const files = evt.target.files;
    const file = files[0];

    if (files && file) {
      const reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.profilePicB64 = btoa(binaryString);
    console.log(this.profilePicB64);
  }

  update() {
    this.currentUser.profilePic = this.profilePicB64;
    this.userService.update(this.currentUser).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
}
