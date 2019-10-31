import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

fdescribe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the background', () => {
    component.landing();
    expect(component.landingType).toBe('landing2');
    component.landing1();
    expect(component.landingType).toBe('landing1');
    component.landing3();
    expect(component.landingType).toBe('landing3');
  });

  it('should generate the subtitle in h2', () => {
    expect(de.query(By.css('h2')).nativeElement.innerText).toBe('For the patient');
  })
});
