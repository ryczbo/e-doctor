import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPickerComponent } from './main-picker.component';

describe('MainPickerComponent', () => {
  let component: MainPickerComponent;
  let fixture: ComponentFixture<MainPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
