import * as _ from 'lodash'
export type EntityId = string
export type EntityData = any
export class ModelBuilder {
  private entities: {[entityId: string]: EntityData} = {}
  public build(): Model {
    return new Model(_.mapValues(this.entities, (entityData) =>
      new Entity(entityData)))
  }
  public addAttributes(id: EntityId, attributes: any) {
    this.entities[id] = attributes
  }
}

export class Entity {
  constructor(private data) {}
  public attributes(): any {
    return this.data
  }
}

export class Model {
  constructor(private entities: {[entityId: string]: Entity}) {}
  public get(id: EntityId): Entity {
    return this.entities[id]
  }
}
