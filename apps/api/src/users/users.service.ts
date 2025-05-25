import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  /**
   * Create a new user, handling duplicate email errors.
   */
  async create(data: Prisma.UserCreateInput): Promise<UserEntity> {
    try {
      return await this.usersRepo.create(data);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username or email already in use');
      }
      throw error;
    }
  }

  /**
   * Find a user by their unique email.
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    try {
      const user =  this.usersRepo.findByEmail(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  /**
   * Find a user by their ID, or throw if not found.
   */
  async findById(id: number): Promise<UserEntity> {
    const user = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Update an existing user, handling not-found and duplicate email errors.
   */
  async update(
    id: number,
    data: Prisma.UserUpdateInput
  ): Promise<UserEntity> {
    try {
      return await this.usersRepo.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('A user with this email already exists');
        }
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
      throw error;
    }
  }

  /**
   * Delete a user by ID, or throw if not found.
   */
  async delete(id: number): Promise<void> {
    try {
      await this.usersRepo.delete({ id });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async findByResetToken(token: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });
  }
}
