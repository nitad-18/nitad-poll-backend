import { Test, TestingModule } from '@nestjs/testing';
import { PollOptionController } from 'src/poll-option/poll-option.controller';
import { PollOptionService } from 'src/poll-option/poll-option.service';

describe('PollOptionController', () => {
  let controller: PollOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollOptionController],
      providers: [PollOptionService],
    }).compile();

    controller = module.get<PollOptionController>(PollOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
