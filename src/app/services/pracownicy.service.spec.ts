import { TestBed } from '@angular/core/testing';

import { PracownicyService } from './pracownicy.service';

describe('PracownicyService', () => {
  let service: PracownicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracownicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
