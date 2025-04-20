import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunModelComponent } from './run-model.component';

describe('RunModelComponent', () => {
  let component: RunModelComponent;
  let fixture: ComponentFixture<RunModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
