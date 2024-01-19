import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class ILoginResponseDTO {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export class IRegisterResponseDTO {
  email: string;
  name: string;
}
