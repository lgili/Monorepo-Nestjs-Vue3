// src/users/user.entity.ts
import { Exclude, Expose } from 'class-transformer';


export class UserEntity {
  @Expose() id: number;
  @Expose() firstName: string;
  @Expose() lastName: string;
  @Expose() username: string;
  @Expose() email: string;

  // we keep password un-exposed but still present internally:
  password: string;

  @Expose() createdAt: Date;
  @Expose() updatedAt: Date;
}

