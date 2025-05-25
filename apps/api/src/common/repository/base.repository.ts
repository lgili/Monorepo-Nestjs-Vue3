// src/common/repository/base.repository.ts

import { PrismaService } from '../../prisma/prisma.service';
import { QueryOptionsDto } from './query/dto/queryOptions.dto';
import { QueryResponseDto } from './query/dto/queryResponse.dto';
import { queryBuilder } from './query/queryBuilder';
import {
  plainToInstance,
  instanceToPlain,
  ClassConstructor
} from 'class-transformer';

export abstract class BaseRepository<
  TEntity,
  TCreateDto extends Record<string, any>,
  TUpdateDto extends Record<string, any>
> {
  constructor(
    protected readonly prisma: PrismaService,
    /** Prisma client property name, e.g. "user" */
    private readonly modelName: keyof PrismaService,
    /** Class to serialize rows into, e.g. UserEntity */
    private readonly entityClass?: ClassConstructor<TEntity>
  ) {}

  /** @internal Convert a single plain object → TEntity instance */
  protected toEntity(row: any): TEntity {
    return this.entityClass
      ? plainToInstance(this.entityClass, row)
      : (row as TEntity);
  }

  /** @internal Convert an array of plain objects → array of TEntity */
  protected toEntityMany(rows: any[]): TEntity[] {
    return rows.map(r => this.toEntity(r));
  }

  /** @internal Convert CreateDto or Entity instance → pure CreateDto */
  protected toCreateDto(dataOrEntity: TCreateDto | TEntity): TCreateDto {
    if (this.entityClass && dataOrEntity instanceof this.entityClass) {
      return instanceToPlain(dataOrEntity) as any as TCreateDto;
    }
    return dataOrEntity as TCreateDto;
  }

  /** @internal Normalize update argument into `{ where, data }` */
  protected toUpdateDto(
    arg: { where: any; data: TUpdateDto } | (TEntity & { id: any })
  ): { where: any; data: TUpdateDto } {
    if (this.entityClass && arg instanceof this.entityClass) {
      const plain = instanceToPlain(arg) as any;
      const { id, ...rest } = plain;
      return { where: { id }, data: rest as TUpdateDto };
    }
    return arg as { where: any; data: TUpdateDto };
  }

  /**
   * Create a new record.
   * Accepts either a plain CreateDto or an instance of your Entity class.
   */
  async create(dtoOrEntity: TCreateDto | TEntity): Promise<TEntity> {
    const data = this.toCreateDto(dtoOrEntity);
    // @ts-ignore: dynamic property
    const created = await this.prisma[this.modelName].create({ data });
    return this.toEntity(created);
  }

  /**
   * Delete one record by its unique where clause.
   * E.g. `await repo.delete({ id: 5 })`
   */
  async delete(where: any): Promise<void> {
    // @ts-ignore
    await this.prisma[this.modelName].delete({ where });
  }

  /**
   * Update an existing record.
   * Accepts either `{ where, data }` or an Entity instance (must have `id`).
   */
  async update(
    arg: { where: any; data: TUpdateDto } | (TEntity & { id: any })
  ): Promise<TEntity> {
    const { where, data } = this.toUpdateDto(arg);
    // @ts-ignore
    const updated = await this.prisma[this.modelName].update({ where, data });
    return this.toEntity(updated);
  }

  /**
   * Find one record by its unique identifier.
   */
  async findById(id: any): Promise<TEntity | null> {
    // @ts-ignore
    const row = await this.prisma[this.modelName].findUnique({ where: { id } });
    return row ? this.toEntity(row) : null;
  }

  /**
   * Find one record matching arbitrary QueryOptions.
   * Returns `TEntity` or `null` if none found.
   */
  async findOne(options): Promise<TEntity | null> {
    const args = queryBuilder(options);
    // @ts-ignore
    const row = await this.prisma[this.modelName].findFirst(args);
    return row ? this.toEntity(row) : null;
  }

  /**
   * Find and count all records matching QueryOptions.
   * Returns `[entities, totalCount]`.
   */
  async findAndCount(
    options: QueryOptionsDto
  ): Promise<[TEntity[], number]> {
    const args = queryBuilder(options);
    // @ts-ignore
    const rows = await this.prisma[this.modelName].findMany(args);
    // count only uses `where`
    // @ts-ignore
    const total = await this.prisma[this.modelName].count({ where: args.where });
    return [this.toEntityMany(rows), total];
  }

  /**
   * Find one record by a single field name/value pair.
   * E.g. `await repo.findBy('email', 'foo@bar.com')`
   */
  async findBy(fieldName: string, value: any): Promise<TEntity | null> {
    // @ts-ignore
    const row = await this.prisma[this.modelName].findFirst({
      where: { [fieldName]: value },
    });
    return row ? this.toEntity(row) : null;
  }

  /**
   * Count all records matching QueryOptions.
   */
  async countEntityByCondition(
    options: QueryOptionsDto
  ): Promise<number> {
    const { where } = queryBuilder(options);
    // @ts-ignore
    return this.prisma[this.modelName].count({ where });
  }

  /**
   * Return a full paginated response.
   * Uses `findAndCount()` under the hood.
   */
  async paginate(
    options: QueryOptionsDto
  ): Promise<QueryResponseDto<TEntity>> {
    const [data, total] = await this.findAndCount(options);
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const lastPage = Math.ceil(total / limit);
    return {
      data,
      meta: { total, page, limit, lastPage },
    };
  }
}
