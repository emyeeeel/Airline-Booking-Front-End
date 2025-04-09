import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartingListComponent } from './departing-list.component';

describe('DepartingListComponent', () => {
  let component: DepartingListComponent;
  let fixture: ComponentFixture<DepartingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
