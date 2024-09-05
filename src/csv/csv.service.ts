import { Injectable } from '@nestjs/common';
import * as csvParse from 'csv-parse';
import { Readable } from 'stream';
import { CohereService } from '../cohere/cohere.service';

@Injectable()
export class CsvService {
  constructor(private readonly cohereServive: CohereService) { }

  async parseCsv(buffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results = [];
      const readableStream = new Readable();
      readableStream._read = () => {}; 
      readableStream.push(buffer);
      readableStream.push(null); 
  
      readableStream
        .pipe(csvParse.parse({ columns: true, trim: true }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
  

  async analyzeData(data: any[]): Promise<any> {
    return await this.cohereServive.analyzeData(data);
  }

  async chatWithData(question: string, data: any[]): Promise<any> {
    return await this.cohereServive.chatWithData(question, data);
  }
}
