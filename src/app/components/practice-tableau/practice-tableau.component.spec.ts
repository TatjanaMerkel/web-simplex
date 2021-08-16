import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTableauComponent } from './practice-tableau.component';

describe('PracticeTableauComponent', () => {
  let component: PracticeTableauComponent;
  let fixture: ComponentFixture<PracticeTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeTableauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
