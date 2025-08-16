import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from 'src/enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'johnny' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: '+998901234567' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'P@ssw0rd123' })
  @IsNotEmpty()
  @IsString()
  confirm_pass: string;

  @ApiProperty({ example: 'MALE', enum: Gender })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
