import * as _ from 'lodash'
export type EntityId = string
export type EntityData = any
export class EntityBuilder {
  private attributeData: any
  constructor(private id: EntityId, private parent?: ModelBuilder) {}
  public attributes(attributes: any) {
    this.attributeData = attributes
  }

  public build(): Entity {
    return new Entity(this.attributeData)
  }
}

export class ModelBuilder {
  private entities: {[entityId: string]: EntityBuilder} = {}
  public build(): Model {
    return new Model(_.mapValues(this.entities, (entityBuilder) =>
      entityBuilder.build()))
  }
  public entity(id: EntityId) {
    if (!this.entities[id]) {
      this.entities[id] = new EntityBuilder(id, this)
    }
    return this.entities[id]
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
