import { Test, TestingModule } from '@nestjs/testing';
import { PollOptionService } from 'src/poll-option/poll-option.service';

describe('PollOptionService', () => {
  let service: PollOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PollOptionService],
    }).compile();

    service = module.get<PollOptionService>(PollOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
