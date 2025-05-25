import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseRepository } from '../common/repository/base.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './user.entity';

/**
 * Repository for User-related database operations.
 * Extends the generic BaseRepository<TEntity, CreateDto, UpdateDto>.
 */
@Injectable()
export class UsersRepository extends BaseRepository<
  UserEntity,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  constructor(prisma: PrismaService) {
    // modelName "user" must match the PrismaClient property (prisma.user)
    super(prisma, 'user', UserEntity);
  }

  /**
   * Find a single user by their unique email address.
   *
   * @param email  The email of the user to find.
   * @returns      A UserEntity instance or null if not found.
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    // Delegates to BaseRepository.findBy, which returns an Entity instance
    return this.findBy('email', email);
  }
}
