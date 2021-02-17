import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule as GraphQLModuleOriginal } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import path from 'path';

@Module({})
export default class GraphQLModule {
  private static formatError(error: GraphQLError): GraphQLError | GraphQLFormattedError {
    if (process.env.NODE_ENV !== 'production') {
      return error;
    }

    return {
      message: error.message
    };
  }

  public static forRoot(): DynamicModule {
    return GraphQLModuleOriginal.forRoot({
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: path.join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      formatError: GraphQLModule.formatError,
      resolverValidationOptions: {
        requireResolversForArgs: false,
        requireResolversForNonScalar: false,
        requireResolversForAllFields: false,
        requireResolversForResolveType: false,
        allowResolversNotInSchema: false
      }
    });
  }
}
