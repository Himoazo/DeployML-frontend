import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanDatasetComponent } from './clean-dataset.component';

describe('CleanDatasetComponent', () => {
  let component: CleanDatasetComponent;
  let fixture: ComponentFixture<CleanDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CleanDatasetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleanDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
