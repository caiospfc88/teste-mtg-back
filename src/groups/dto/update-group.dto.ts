import { IsString, IsOptional } from 'class-validator';

export class UpdateGroupDTO {
  @IsString()
  @IsOptional()
  name?: string;
}
