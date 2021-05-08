import { DatePickerDirective } from './date-picker.directive';
import { discardPeriodicTasks, tick, fakeAsync, TestBed, ComponentFixture, TestModuleMetadata } from '@angular/core/testing';
import { Component, DebugElement, HostListener } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<button rrDatePicker class="rr-datepicker-trigger">datepicker</button>`
})
class TestDatePickerComponent {
  @HostListener('click')
  onClick() {
  }
}

describe('Directive: DatePickerDirective', () => {

let fixture: ComponentFixture<any>;
let component: TestDatePickerComponent;
let inputEl: DebugElement;

beforeEach(() => {

  spyOn(document, 'querySelector').and.callFake(function() {
    const el = document.createElement('button');

    const createDatePickerEvent = new CustomEvent(
      'createDatePicker',
      {
        detail: {
          datePickerRef: class MaterialDateTimePicker {
            constructor(obj) {}
            on = (arg1, arg2) => {
              arg2('date');
              return {
                open: () => {}
              };
            }
          }
        },
        bubbles: true,
        cancelable: true
      }
    );

    el.addEventListener('click', function() {
      el.dispatchEvent(createDatePickerEvent);
    }, false);

    return el;
  });
  const testModuleMetadata: TestModuleMetadata = {
     declarations: [TestDatePickerComponent, DatePickerDirective]
   };
  fixture = TestBed.configureTestingModule(testModuleMetadata)
  .createComponent(TestDatePickerComponent);
  fixture.detectChanges();
  component = fixture.componentInstance;
  inputEl = fixture.debugElement.query(By.css('button'));
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should show date picker on button click', fakeAsync(() => {
    console.log({inputEl});
    console.log({fixture});
    fixture.detectChanges();
    inputEl.triggerEventHandler('click', null);
    tick(Infinity);
    discardPeriodicTasks();
  }));
});
