import type { PipelineStage } from 'mongoose';

/**
 * Base repository interface for common CRUD operations
 */
export interface BaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(filter: Partial<T>): Promise<T | null>;
  find(filter: Partial<T>): Promise<T[]>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  aggregate?(pipeline: PipelineStage[]): Promise<T[]>;
}
