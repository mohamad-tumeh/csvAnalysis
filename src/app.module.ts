import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { CsvController } from './csv/csv.controller';
import { CsvService } from './csv/csv.service';
import { CohereService } from './cohere/cohere.service';

@Module({
  imports: [HttpModule],
  controllers: [CsvController],
  exports: [CohereService],
  providers: [CsvService, CohereService],
})
export class AppModule {}
