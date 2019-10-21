import {Component, OnInit, ViewChild, NgZone, Input} from '@angular/core';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {first, take} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
// import { UserService } from "../shared/services/user.service";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthenticationService } from "../shared/services/authentication.service";
import {User} from "../_models/user";
import {Subscription} from "rxjs";
import {RegisterService} from "../shared/services";

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
  previousVisits;
  visitSaved: boolean;

  constructor(
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    // private userService: UserService,
    private sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private registerService: RegisterService
  ) {
    this.currentUserSubscription = this.registerService.currentUser.subscribe(user => {
      this.currentUser = user; });
    // this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
    //   + this.patient.profilePic);

  }

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  @Input() visit;

  ngOnInit() {
    this.registerService.getById(this.visit.patientId).pipe(first()).subscribe(patient => {
      this.patient = patient;
      this.previousVisits = this.patient.visits.filter(e => e.status === 'completed');
      console.log(this.previousVisits);
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
    this.visitSaved = false;
  }

  getPreviousVisits() {
    console.log(this.patient);
    if (this.patient.visits.filter(e => e.status === 'completed').length > 0) {
    this.previousVisits = this.patient.visits.filter(e => e.status === 'completed');
  } else {
    this.previousVisits = ['No previous visits!'];
  }}

  submit() {
    const foundIndexDoc = this.currentUser.visits.findIndex(x => x.id === this.visit.id);
    const foundIndexPat = this.patient.visits.findIndex(x => x.id === this.visit.id);
    this.currentUser.visits[foundIndexDoc].exam = this.conductVisitForm.value;
    this.currentUser.visits[foundIndexDoc].status = 'completed';
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this.registerService.update(this.currentUser).subscribe();
    this.patient.visits[foundIndexPat].exam = this.conductVisitForm.value;
    this.patient.visits[foundIndexPat].status = 'completed';
    this.registerService.update(this.patient).subscribe();
    this.visitSaved = true;
  }
}
