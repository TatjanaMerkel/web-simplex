import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStandardFormComponent } from './new-standard-form.component';

describe('NewStandardFormComponent', () => {
  let component: NewStandardFormComponent;
  let fixture: ComponentFixture<NewStandardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStandardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStandardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
