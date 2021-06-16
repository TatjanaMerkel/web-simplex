import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBoxComponent } from './navigation-box.component';

describe('NavigationBoxComponent', () => {
  let component: NavigationBoxComponent;
  let fixture: ComponentFixture<NavigationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
