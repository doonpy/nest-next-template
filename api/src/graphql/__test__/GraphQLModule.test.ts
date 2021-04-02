import { GraphQLModule as GraphQLModuleOriginal } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

import GraphQLModule from '../GraphQLModule';

describe('GraphQLModule', () => {
  describe('formatError', () => {
    it('should return error is instance of GraphQLError in development environment', () => {
      const error = new GraphQLError('Error message');
      const result = GraphQLModule.formatError(error);

      expect(result).toMatchObject(error);
    });

    it('should return formatted error in production environment', () => {
      process.env.NODE_ENV = 'production';
      const error = new GraphQLError('Error message');
      const result = GraphQLModule.formatError(error);

      expect(result).toMatchObject({ message: error.message });
    });
  });

  describe('forRoot', () => {
    it('should return "GraphQLModule" of @nestjs/graphql', () => {
      const expectedModule = GraphQLModuleOriginal.forRoot({ autoSchemaFile: false });
      const graphqlModule = GraphQLModule.forRoot();

      expect(Object(graphqlModule).toString()).toEqual(Object(expectedModule).toString());
    });
  });
});
