import { IsString, IsNotEmpty } from 'class-validator';

export class AddUserToGroupDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;
}
