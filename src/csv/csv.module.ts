import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { MulterModule } from '@nestjs/platform-express';
import { CohereModule } from '../cohere/cohere.module';

@Module({
  imports: [MulterModule.register({ dest: './uploads' }), CohereModule],
  providers: [CsvService],
  controllers: [CsvController],
})
export class CsvModule {}
