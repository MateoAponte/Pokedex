import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsOptional()
  skip: string;

  @IsString()
  @IsOptional()
  limit: string;
}
