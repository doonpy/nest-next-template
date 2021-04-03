import UserType from '../graphql/UserType';
import UserAge from '../models/UserAge';
import UserId from '../models/UserId';
import UserName from '../models/UserName';

export interface UserConstructor {
  id: number;
  name: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

export default class User {
  private _id: UserId;
  private _name: UserName;
  private _age: UserAge;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor({ id, name, age, createdAt, updatedAt }: UserConstructor) {
    this._id = new UserId(id);
    this._name = new UserName(name);
    this._age = new UserAge(age);
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): UserId {
    return this._id;
  }

  set id(value: UserId) {
    this._id = value;
  }

  get name(): UserName {
    return this._name;
  }

  set name(value: UserName) {
    this._name = value;
  }

  get age(): UserAge {
    return this._age;
  }

  set age(value: UserAge) {
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
