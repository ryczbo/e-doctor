import {Component, OnInit, ViewChild, NgZone, Input} from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {first, take} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserService } from "../_services/user.service";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "../_services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-visit-conduct',
  templateUrl: './visit-conduct.component.html',
  styleUrls: ['./visit-conduct.component.css']
})
export class VisitConductComponent implements OnInit {
  conductVisitForm: FormGroup;
  patient;
  imgPath;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;})
    // this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
    //   + this.patient.profilePic);

  }

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  @Input() visit;


  ngOnInit() {
    this.userService.getById(this.visit.patientId).pipe(first()).subscribe(patient => {
      this.patient = patient;
    });
    this.conductVisitForm = this.formBuilder.group({
      weight: '',
      heartRate: '',
      bloodPressure: '',
      medHistory: '',
      diagnosis: '',
      prescription: '',
      advices: ''
    });

    console.log(this.patient);
  }

  submit() {
    const foundIndexDoc = this.currentUser.visits.findIndex(x => x.id === this.visit.id);
    const foundIndexPat = this.patient.visits.findIndex(x => x.id === this.visit.id);
    this.currentUser.visits[foundIndexDoc].exam = this.conductVisitForm.value;
    this.currentUser.visits[foundIndexDoc].status = 'completed';
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.userService.update(this.currentUser).subscribe();
    this.patient.visits[foundIndexPat].exam = this.conductVisitForm.value;
    this.patient.visits[foundIndexPat].status = 'completed';
    this.userService.update(this.patient).subscribe();
  }

}
