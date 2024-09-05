import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { ChatDataDto } from './dto/chat-data.dto';
// import { UploadFileDto } from './dto/upload-file.dto';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File upload failed or file buffer is missing');
    }
    const data = await this.csvService.parseCsv(file.buffer);
    const analysis = await this.csvService.analyzeData(data);
    return { data, analysis };
  }
  

  @Post('chat')
  async chatWithData(@Body() chatDataDto: ChatDataDto) {
    const { question, data } = chatDataDto;
    try {
        const analysis = await this.csvService.chatWithData(question, data);
        return { answer: analysis };
    } catch (error) {
        console.error('Error in chatWithData:', error);
        return { answer: 'Error processing the request' };
    }
}
}
