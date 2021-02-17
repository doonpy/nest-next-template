import Id from '../../../common/value-objects/Id';
import UserType from '../graphql/UserType';
import Age from '../value-objects/Age';
import Name from '../value-objects/Name';

export default class User {
  private id: Id;
  private name: Name;
  private age: Age;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(id: number, name: string, age: number, createdAt: Date, updatedAt: Date) {
    this.id = new Id(id);
    this.name = new Name(name);
    this.age = new Age(age);
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public convertToGraphQLType(): UserType {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      age: this.age.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
