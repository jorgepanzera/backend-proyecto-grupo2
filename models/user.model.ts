import { IsNotEmpty, IsEmail, IsOptional, IsInt, Min, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { generateUUID } from '../utils/generate_uuid';

export interface User {
    user_id: string;
    username: string;
    password: string;
    user_type: number;
    type: string;
    email: string;
    mobile_number: string;
    created_time: Date
  }
  

export class InsertUserDto {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  password!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsOptional()
  mobile_number!: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  user_type: number = 1;

  @IsOptional()
  created_time: Date = new Date();

  @Transform(({ value }) => generateUUID())
  user_id!: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  username!: string;

  @IsOptional()
  password!: string;

  @IsOptional()
  mobile_number!: string;

  @IsEmail({}, { each: true })
  @IsOptional()
  email!: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  user_type!: number;

}

export interface UserPhoto {
  url: string;
}