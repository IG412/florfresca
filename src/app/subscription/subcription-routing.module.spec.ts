import { SubcriptionRoutingModule } from './subcription-routing.module';

describe('SubcriptionRoutingModule', () => {
  let subcriptionRoutingModule: SubcriptionRoutingModule;

  beforeEach(() => {
    subcriptionRoutingModule = new SubcriptionRoutingModule();
  });

  it('should create an instance', () => {
    expect(subcriptionRoutingModule).toBeTruthy();
  });
});
