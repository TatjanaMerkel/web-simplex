import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LinearSystemDataComponent} from './linear-system-data.component';

describe('LinearSystemComponent', () => {
  let component: LinearSystemDataComponent;
  let fixture: ComponentFixture<LinearSystemDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinearSystemDataComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearSystemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
