import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PoojasEffects } from './poojas.effects';

describe('PoojasEffects', () => {
  let actions$: Observable<any>;
  let effects: PoojasEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PoojasEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(PoojasEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
