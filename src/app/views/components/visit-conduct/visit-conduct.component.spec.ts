import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitConductComponent } from './visit-conduct.component';

describe('VisitConductComponent', () => {
  let component: VisitConductComponent;
  let fixture: ComponentFixture<VisitConductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitConductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitConductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
