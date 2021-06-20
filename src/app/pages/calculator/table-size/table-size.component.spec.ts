import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSizeComponent } from './table-size.component';

describe('TableSizeComponent', () => {
  let component: TableSizeComponent;
  let fixture: ComponentFixture<TableSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
