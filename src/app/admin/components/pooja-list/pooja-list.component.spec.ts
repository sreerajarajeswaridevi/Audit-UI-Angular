import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoojaListComponent } from './pooja-list.component';

describe('PoojaListComponent', () => {
  let component: PoojaListComponent;
  let fixture: ComponentFixture<PoojaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoojaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoojaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
