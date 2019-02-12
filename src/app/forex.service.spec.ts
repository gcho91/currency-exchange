import { TestBed } from '@angular/core/testing';

import { ForexService } from './forex.service';

describe('ForexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForexService = TestBed.get(ForexService);
    expect(service).toBeTruthy();
  });
});
