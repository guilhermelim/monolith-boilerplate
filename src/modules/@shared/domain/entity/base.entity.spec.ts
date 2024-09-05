import Id from '../value-object/id.value-object';
import BaseEntity from './base.entity';

describe('BaseEntity Unit Tests', () => {
  it('should create an entity with default dates and id', () => {
    const entity = new BaseEntity();

    expect(entity.id).toBeDefined();
    expect(entity.createdAt).toBeInstanceOf(Date);
    expect(entity.updatedAt).toBeInstanceOf(Date);
    expect(entity.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
    expect(entity.updatedAt.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('should create an entity with provided id, createdAt, and updatedAt', () => {
    const id = new Id('123');
    const createdAt = new Date('2024-01-01T00:00:00Z');
    const updatedAt = new Date('2024-01-02T00:00:00Z');

    const entity = new BaseEntity(id, createdAt, updatedAt);

    expect(entity.id.id).toBe('123');
    expect(entity.createdAt).toEqual(createdAt);
    expect(entity.updatedAt).toEqual(updatedAt);
  });

  it('should update the updatedAt date', () => {
    const createdAt = new Date('2024-01-01T00:00:00Z');
    const entity = new BaseEntity(undefined, createdAt);

    const newUpdatedAt = new Date('2024-01-02T00:00:00Z');
    entity.updatedAt = newUpdatedAt;

    expect(entity.updatedAt).toEqual(newUpdatedAt);
  });

  it('should throw an error if updatedAt is set to a date earlier than createdAt', () => {
    const createdAt = new Date('2023-01-02T00:00:00Z');
    const entity = new BaseEntity(undefined, createdAt);

    const earlierDate = new Date('2023-01-01T00:00:00Z');

    expect(() => {
      entity.updatedAt = earlierDate;
    }).toThrow('UpdatedAt cannot be earlier than CreatedAt.');
  });
});
