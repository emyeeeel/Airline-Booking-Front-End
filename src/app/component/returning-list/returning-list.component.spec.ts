import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturningListComponent } from './returning-list.component';

describe('ReturningListComponent', () => {
  let component: ReturningListComponent;
  let fixture: ComponentFixture<ReturningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturningListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
