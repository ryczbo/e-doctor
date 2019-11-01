import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services';
import { User } from '../../../_models/user';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";
import {AppRouterLinks} from "../../../app-routing.config";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  user: User;
  profilePicB64;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
    this.currentUser = user;
    if (!this.currentUser) {
      this.router.navigate([`${AppRouterLinks.DEFAULT}`]);
    }
    });
  }

  ngOnInit() {
  }

  // encoding and reading base64 images
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
  }

  update() {
    this.currentUser.profilePic = this.profilePicB64;
    this.userService.update(this.currentUser).subscribe();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }
}
