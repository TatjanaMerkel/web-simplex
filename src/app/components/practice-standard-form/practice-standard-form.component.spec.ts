import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeStandardFormComponent } from './practice-standard-form.component';

describe('PracticeStandardFormComponent', () => {
  let component: PracticeStandardFormComponent;
  let fixture: ComponentFixture<PracticeStandardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeStandardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeStandardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
