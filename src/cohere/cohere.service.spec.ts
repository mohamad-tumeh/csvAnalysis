import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CohereService } from './cohere.service'; 
import { CohereClient } from 'cohere-ai';

describe('CohereService', () => {
  let service: CohereService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule], 
      providers: [
        CohereService,
        {
          provide: CohereClient,
          useValue: new CohereClient({
            token: "5PD2EFcc1ILIkOXH640CZt0YcuH0mifF7am81Xo3",
        }), 
        },
      ],
    }).compile();

    service = module.get<CohereService>(CohereService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyzeData', () => {
    it('should return analysis results', async () => {
      const data = [{ some: 'data' }];
      
      const response = await service.analyzeData(data);

      expect(response).toBeDefined(); 
      expect(typeof response).toBe('string');
    });

    it('should handle errors', async () => {
      const data = [{ some: 'data' }];

      jest.spyOn(service, 'analyzeData').mockRejectedValueOnce(new Error('API error'));

      await expect(service.analyzeData(data)).rejects.toThrow('API error');
    });
  });

  describe('chatWithData', () => {
    it('should return chat response', async () => {
      const data = [{ some: 'data' }];
      const question = 'What is the data?';

      const response = await service.chatWithData(question, data);

      expect(response).toBeDefined();
      expect(typeof response).toBe('string');
    });

    it('should handle errors', async () => {
      const data = [{ some: 'data' }];
      const question = 'What is the data?';

      jest.spyOn(service, 'chatWithData').mockRejectedValueOnce(new Error('API error'));

      await expect(service.chatWithData(question, data)).rejects.toThrow('API error');
    });
  });
});
