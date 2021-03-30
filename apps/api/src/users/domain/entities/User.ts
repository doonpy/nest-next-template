import UserType from '../graphql/UserType';
import Age from '../models/Age';
import Id from '../models/Id';
import Name from '../models/Name';

export interface UserConstructor {
  id: number;
  name: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export default class User {
  private _id: Id;
  private _name: Name;
  private _age: Age;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({ id, name, age, createdAt, updatedAt }: UserConstructor) {
    this._id = new Id(id);
    this._name = new Name(name);
    this._age = new Age(age);
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): Id {
    return this._id;
  }

  set id(value: Id) {
    this._id = value;
  }

  get name(): Name {
    return this._name;
  }

  set name(value: Name) {
    this._name = value;
  }

  get age(): Age {
    return this._age;
  }

  set age(value: Age) {
    this._age = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  /**
   * Convert to GraphQL type
   */
  public convertToGraphql(): UserType {
    return {
      id: this._id.value,
      name: this._name.value,
      age: this._age.value,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}
