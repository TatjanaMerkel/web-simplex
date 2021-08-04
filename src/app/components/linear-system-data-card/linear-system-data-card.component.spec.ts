import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearSystemDataCardComponent } from './linear-system-data-card.component';

describe('LinearSystemDataCardComponent', () => {
  let component: LinearSystemDataCardComponent;
  let fixture: ComponentFixture<LinearSystemDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearSystemDataCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearSystemDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
