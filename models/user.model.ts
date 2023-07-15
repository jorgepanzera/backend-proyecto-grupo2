import { IsNotEmpty, IsEmail, IsOptional, IsInt, Min, IsDateString } from 'class-validator';

export interface User {
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
}

export class UpdateUserDto {
  @IsNotEmpty()
  username!: string;

  @IsOptional()
  password!: string;

  @IsOptional()
  mobile_number!: string;

  @IsEmail()
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