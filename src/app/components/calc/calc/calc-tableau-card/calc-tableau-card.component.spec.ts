import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalcTableauCardComponent} from './calc-tableau-card.component';

describe('NewTableauComponent', () => {
  let component: CalcTableauCardComponent;
  let fixture: ComponentFixture<CalcTableauCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcTableauCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcTableauCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
