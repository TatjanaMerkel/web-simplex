import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableauComponent } from './new-tableau.component';

describe('NewTableauComponent', () => {
  let component: NewTableauComponent;
  let fixture: ComponentFixture<NewTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTableauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
