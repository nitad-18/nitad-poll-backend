import { Test, TestingModule } from '@nestjs/testing';
import { PollController } from 'src/poll/poll.controller';
import { PollService } from 'src/poll/poll.service';

describe('PollController', () => {
  let controller: PollController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollController],
      providers: [PollService],
    }).compile();

    controller = module.get<PollController>(PollController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
