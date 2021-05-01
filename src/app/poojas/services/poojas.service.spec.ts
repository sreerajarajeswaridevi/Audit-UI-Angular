import { TestBed, inject } from '@angular/core/testing';

import { PoojasService } from './poojas.service';

describe('PoojasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PoojasService]
    });
  });

  it('should be created', inject([PoojasService], (service: PoojasService) => {
    expect(service).toBeTruthy();
  }));
});
