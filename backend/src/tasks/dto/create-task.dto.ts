import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsBoolean()
  status: boolean;
}
