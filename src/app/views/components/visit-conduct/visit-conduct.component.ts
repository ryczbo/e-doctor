import { Component, OnInit, ViewChild, NgZone, Input } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../../_models/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services';

@Component({
  selector: 'app-visit-conduct',
  templateUrl: './visit-conduct.component.html',
  styleUrls: ['./visit-conduct.component.scss']
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
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user; });
  }

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;
  @Input() visit;

  ngOnInit() {
    this.userService.getById(this.visit.patientId).pipe(first()).subscribe(patient => {
      this.patient = patient;
      this.getPreviousVisits();
      this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + this.patient.profilePic);
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
    this.previousVisits = null;
  }}

  submit() {
    const foundIndexDoc = this.currentUser.visits.findIndex(x => x.id === this.visit.id);
    const foundIndexPat = this.patient.visits.findIndex(x => x.id === this.visit.id);
    this.currentUser.visits[foundIndexDoc].exam = this.conductVisitForm.value;
    this.currentUser.visits[foundIndexDoc].status = 'completed';
    this.userService.update(this.currentUser).subscribe(data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
    });
    this.patient.visits[foundIndexPat].exam = this.conductVisitForm.value;
    this.patient.visits[foundIndexPat].status = 'completed';
    this.userService.update(this.patient).subscribe();
    this.visitSaved = true;
  }
}
