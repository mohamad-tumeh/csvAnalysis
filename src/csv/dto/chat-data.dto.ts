import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class ChatDataDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsArray()
  data: any[];
}
