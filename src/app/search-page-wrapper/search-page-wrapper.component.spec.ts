import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageWrapperComponent } from './search-page-wrapper.component';

describe('SearchPageWrapperComponent', () => {
  let component: SearchPageWrapperComponent;
  let fixture: ComponentFixture<SearchPageWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
