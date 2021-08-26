import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalcStandardFormCardComponent} from './calc-standard-form-card.component';

describe('NewStandardFormComponent', () => {
  let component: CalcStandardFormCardComponent;
  let fixture: ComponentFixture<CalcStandardFormCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcStandardFormCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcStandardFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
