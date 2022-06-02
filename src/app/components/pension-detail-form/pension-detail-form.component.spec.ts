import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionDetailFormComponent } from './pension-detail-form.component';

describe('PensionDetailFormComponent', () => {
  let component: PensionDetailFormComponent;
  let fixture: ComponentFixture<PensionDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
