import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
