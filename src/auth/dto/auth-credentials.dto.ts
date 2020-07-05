import { IsString, MinLength, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString({ message: 'Username must be a string' })
  @MinLength(4, { message: 'Username cannot be less than 4 characters' })
  @MaxLength(20, { message: 'Username cannot be more than 20 characters' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password should have atleast 8 characters' })
  @MaxLength(20, { message: 'Password cannot be more than 20 characters' })
  password: string;
}
