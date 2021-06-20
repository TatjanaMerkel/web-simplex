import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeLpComponent } from './large-lp.component';

describe('LargeLpComponent', () => {
  let component: LargeLpComponent;
  let fixture: ComponentFixture<LargeLpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeLpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeLpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
