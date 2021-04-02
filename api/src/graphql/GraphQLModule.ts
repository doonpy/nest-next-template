import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule as GraphQLModuleOriginal } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import path from 'path';

@Module({})
export default class GraphQLModule {
  /**
   * Format GraphQL error
   */
  public static formatError(error: GraphQLError): GraphQLError | GraphQLFormattedError {
    if (process.env.NODE_ENV !== 'production') {
      return error;
    }

    return {
      message: error.message
    };
  }

  /**
   * Initialize module
   */
  public static forRoot(): DynamicModule {
    return GraphQLModuleOriginal.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: path.join(
        process.cwd().includes('api') ? process.cwd() : path.join(process.cwd(), 'api'),
        'schema.gql'
      ),
      sortSchema: true,
      formatError: GraphQLModule.formatError
    });
  }
}
