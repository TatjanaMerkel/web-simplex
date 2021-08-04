import {ComponentFixture, TestBed} from '@angular/core/testing';


import {LinearSystemSize} from './linear-system-size.component';


describe('LargeLpComponent', () => {
  let component: LinearSystemSize;
  let fixture: ComponentFixture<LinearSystemSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinearSystemSize]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearSystemSize);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
