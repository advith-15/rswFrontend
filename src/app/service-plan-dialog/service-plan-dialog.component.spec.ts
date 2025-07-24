import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePlanDialogComponent } from './service-plan-dialog.component';

describe('ServicePlanDialogComponent', () => {
  let component: ServicePlanDialogComponent;
  let fixture: ComponentFixture<ServicePlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicePlanDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicePlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
