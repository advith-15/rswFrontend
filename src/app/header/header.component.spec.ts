import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee name and ID', () => {
    component.employeeName = 'Test User';
    component.employeeId = 'TEST123';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.employee-name').textContent).toContain('Test User');
    expect(compiled.querySelector('.employee-id').textContent).toContain('TEST123');
  });

  it('should call onProfileClick when profile button is clicked', () => {
    spyOn(component, 'onProfileClick');
    const profileButton = fixture.nativeElement.querySelector('.profile-btn');
    profileButton.click();
    expect(component.onProfileClick).toHaveBeenCalled();
  });

  it('should call onHelpClick when help button is clicked', () => {
    spyOn(component, 'onHelpClick');
    const helpButton = fixture.nativeElement.querySelector('.help-btn');
    helpButton.click();
    expect(component.onHelpClick).toHaveBeenCalled();
  });
});