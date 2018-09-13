import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsviewsComponent } from './credentialsviews.component';

describe('CredentialsviewsComponent', () => {
  let component: CredentialsviewsComponent;
  let fixture: ComponentFixture<CredentialsviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CredentialsviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
