import { Exclude, Expose } from 'class-transformer';

Exclude()
export class UserResponseDto {
  id: number;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() username: string;
  @Expose() email: string;

  // we keep password un-exposed but still present internally:
  password: string;

  createdAt: Date;
  updatedAt: Date;
}