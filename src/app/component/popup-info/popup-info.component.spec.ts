import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInfoComponent } from './popup-info.component';

describe('PopupInfoComponent', () => {
  let component: PopupInfoComponent;
  let fixture: ComponentFixture<PopupInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
