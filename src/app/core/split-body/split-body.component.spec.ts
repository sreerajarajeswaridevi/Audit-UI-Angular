import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitBodyComponent } from './split-body.component';

describe('SplitBodyComponent', () => {
  let component: SplitBodyComponent;
  let fixture: ComponentFixture<SplitBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
