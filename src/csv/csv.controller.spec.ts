import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { CohereService } from '../cohere/cohere.service';

describe('CsvController', () => {
  let controller: CsvController;
  let service: CsvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvController],
      providers: [
        CsvService,
        CohereService,
        HttpService,
      ],
    }).compile();

    controller = module.get<CsvController>(CsvController);
    service = module.get<CsvService>(CsvService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle chat with data', async () => {
    const question = 'What is this?';
    const data = [];
    const answer = 'Sample answer';
    
    jest.spyOn(service, 'chatWithData').mockResolvedValue(answer);

    const result = await controller.chatWithData({ question, data });
    expect(result).toEqual({ answer });
  });
});
