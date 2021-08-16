import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeLinearSystemSizeComponent } from './practice-linear-system-size.component';

describe('PracticeLinearSystemSizeComponent', () => {
  let component: PracticeLinearSystemSizeComponent;
  let fixture: ComponentFixture<PracticeLinearSystemSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeLinearSystemSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeLinearSystemSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
