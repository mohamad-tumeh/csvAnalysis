import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CohereService } from './cohere.service';

@Module({
  imports: [HttpModule],
  providers: [CohereService],
  exports: [CohereService],
})
export class CohereModule {}
