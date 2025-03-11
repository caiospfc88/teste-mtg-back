import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  ownerId: string;
}
