import { DocumentNode, gql } from '@apollo/client';

import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './constants';

export default class UserService {
  /**
   * Get GraphQL query of get users
   */
  public getUsersQuery(): DocumentNode {
    return gql`
      query user($limit: Int = ${DEFAULT_LIMIT}, $offset: Int = ${DEFAULT_OFFSET}, $name: String = ""){
          users (limit: $limit, offset: $offset, name: $name) {
              id
              name
              age
          }
      }
    `;
  }

  /**
   * Get create user mutation
   */
  public getCreateUserMutation(): DocumentNode {
    return gql`
      mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          age
          createdAt
          updatedAt
        }
      }
    `;
  }
}
