import { IsNotEmpty } from 'class-validator';

export class ApplyAccessCodeDTO {
  @IsNotEmpty({
    message: 'Access code is required',
  })
  accessCode: string;
}
