import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSolutionComponent } from './practice-solution.component';

describe('PracticeSolutionComponent', () => {
  let component: PracticeSolutionComponent;
  let fixture: ComponentFixture<PracticeSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
