import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullStudentComponent } from './full-student.component';

describe('FullStudentComponent', () => {
  let component: FullStudentComponent;
  let fixture: ComponentFixture<FullStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullStudentComponent]
    });
    fixture = TestBed.createComponent(FullStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
