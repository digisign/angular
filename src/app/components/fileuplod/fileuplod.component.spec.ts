import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileuplodComponent } from './fileuplod.component';

describe('FileuplodComponent', () => {
  let component: FileuplodComponent;
  let fixture: ComponentFixture<FileuplodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileuplodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileuplodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
