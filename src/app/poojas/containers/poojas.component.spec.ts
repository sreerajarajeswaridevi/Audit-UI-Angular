import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoojasComponent } from './poojas.component';

describe('PoojasComponent', () => {
  let component: PoojasComponent;
  let fixture: ComponentFixture<PoojasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoojasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoojasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
