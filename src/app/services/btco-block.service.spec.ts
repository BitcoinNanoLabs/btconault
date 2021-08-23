import { TestBed, inject } from '@angular/core/testing';

import { BtcoBlockService } from './btco-block.service';

describe('BtcoBlockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BtcoBlockService]
    });
  });

  it('should be created', inject([BtcoBlockService], (service: BtcoBlockService) => {
    expect(service).toBeTruthy();
  }));
});
