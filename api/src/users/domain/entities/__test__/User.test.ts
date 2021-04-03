import UserType from '../../graphql/UserType';
import UserAge from '../../models/UserAge';
import UserId from '../../models/UserId';
import UserName from '../../models/UserName';
import User from '../User';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User({
      id: 1,
      name: 'foo',
      age: 2,
      createdAt: new Date(2021, 4, 3),
      updatedAt: new Date(2021, 4, 4)
    });
  });

  describe('get id', () => {
    it('should get correct id value', () => {
      const expectedId = new UserId(1);

      const id = user.id;

      expect(id).toMatchObject(expectedId);
    });
  });

  describe('set id', () => {
    it('should set correct id value', () => {
      const setId = new UserId(2);

      user.id = setId;

      expect(user.id).toMatchObject(setId);
    });
  });

  describe('get name', () => {
    it('should get correct name value', () => {
      const expectedName = new UserName(user.name.value);

      const name = user.name;

      expect(name).toMatchObject(expectedName);
    });
  });

  describe('set name', () => {
    it('should set correct name value', () => {
      const name = new UserName('baz');

      user.name = name;

      expect(user.name).toMatchObject(name);
    });
  });

  describe('get age', () => {
    it('should get correct age value', () => {
      const expectedAge = new UserAge(user.age.value);

      const age = user.age;

      expect(age).toMatchObject(expectedAge);
    });
  });

  describe('set age', () => {
    it('should set correct age value', () => {
      const age = new UserAge(3);

      user.age = age;

      expect(user.age).toMatchObject(age);
    });
  });

  describe('get createdAt', () => {
    it('should get correct createdAt value', () => {
      const createdAt = user.createdAt;

      expect(createdAt).toMatchObject(new Date(2021, 4, 3));
    });
  });

  describe('set createdAt', () => {
    it('should set correct createdAt value', () => {
      const createdAt = new Date();

      user.createdAt = createdAt;

      expect(user.createdAt).toMatchObject(createdAt);
    });
  });

  describe('get updatedAt', () => {
    it('should get correct updatedAt value', () => {
      const updatedAt = user.updatedAt;

      expect(updatedAt).toMatchObject(new Date(2021, 4, 4));
    });
  });

  describe('set updatedAt', () => {
    it('should set correct updatedAt value', () => {
      const updatedAt = new Date();

      user.updatedAt = updatedAt;

      expect(user.updatedAt).toMatchObject(updatedAt);
    });
  });

  describe('convertToGraphql', () => {
    it('should return correct value', () => {
      const expected: UserType = {
        id: 1,
        name: 'foo',
        age: 2,
        createdAt: new Date(2021, 4, 3),
        updatedAt: new Date(2021, 4, 4)
      };

      const result = user.convertToGraphql();

      expect(result).toMatchObject(expected);
    });
  });
});
