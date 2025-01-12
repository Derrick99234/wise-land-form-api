import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateFormDto {
    @IsString()
    @IsNotEmpty()
    fullNames: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    pickUpPoint: string;
}

