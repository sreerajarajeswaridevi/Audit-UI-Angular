import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoojasModalComponent } from './poojas-modal.component';

describe('PoojasModalComponent', () => {
  let component: PoojasModalComponent;
  let fixture: ComponentFixture<PoojasModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoojasModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoojasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
