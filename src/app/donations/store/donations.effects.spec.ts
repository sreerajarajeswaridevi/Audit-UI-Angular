import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DonationsEffects } from './donations.effects';

describe('DonationsEffects', () => {
  let actions$: Observable<any>;
  let effects: DonationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DonationsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(DonationsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
