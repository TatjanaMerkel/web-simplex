import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLinearSystemComponent } from './new-linear-system.component';

describe('NewLinearSystemComponent', () => {
  let component: NewLinearSystemComponent;
  let fixture: ComponentFixture<NewLinearSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLinearSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLinearSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
