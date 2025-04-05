import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiComponentsLibComponent } from './ui-components-lib.component';

describe('UiComponentsLibComponent', () => {
  let component: UiComponentsLibComponent;
  let fixture: ComponentFixture<UiComponentsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiComponentsLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiComponentsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
