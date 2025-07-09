import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarComponent } from './status-bar.component';

describe('StatusBarComponent', () => {
  let component: StatusBarComponent;
  let fixture: ComponentFixture<StatusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display system information', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.system-id-btn').textContent).toContain('100373386');
    expect(compiled.querySelector('.case-number').textContent).toContain('0124682519');
    expect(compiled.querySelector('.location-text').textContent).toContain('EMEA - IBE - Spain - Espirinado');
  });

  it('should call onLogViewerClick when log viewer button is clicked', () => {
    spyOn(component, 'onLogViewerClick');
    const logViewerBtn = fixture.nativeElement.querySelector('.log-viewer');
    logViewerBtn.click();
    expect(component.onLogViewerClick).toHaveBeenCalled();
  });

  it('should call onOpenInPRSPortalClick when PRS portal button is clicked', () => {
    spyOn(component, 'onOpenInPRSPortalClick');
    const prsPortalBtn = fixture.nativeElement.querySelector('.prs-portal');
    prsPortalBtn.click();
    expect(component.onOpenInPRSPortalClick).toHaveBeenCalled();
  });

  it('should call onCaseHistoryAnalyserClick when history analyser button is clicked', () => {
    spyOn(component, 'onCaseHistoryAnalyserClick');
    const historyAnalyserBtn = fixture.nativeElement.querySelector('.history-analyser');
    historyAnalyserBtn.click();
    expect(component.onCaseHistoryAnalyserClick).toHaveBeenCalled();
  });

  it('should call onPrintClick when print button is clicked', () => {
    spyOn(component, 'onPrintClick');
    const printBtn = fixture.nativeElement.querySelector('.print-btn');
    printBtn.click();
    expect(component.onPrintClick).toHaveBeenCalled();
  });

  it('should display active contract status correctly', () => {
    component.activeContract = true;
    fixture.detectChanges();
    const statusIndicator = fixture.nativeElement.querySelector('.status-indicator');
    expect(statusIndicator.classList).toContain('active');
  });

  it('should display inactive contract status correctly', () => {
    component.activeContract = false;
    fixture.detectChanges();
    const statusIndicator = fixture.nativeElement.querySelector('.status-indicator');
    expect(statusIndicator.classList).not.toContain('active');
  });
});