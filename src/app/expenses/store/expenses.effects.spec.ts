import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExpensesEffects } from './expenses.effects';

describe('ExpensesEffects', () => {
  let actions$: Observable<any>;
  let effects: ExpensesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpensesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ExpensesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
