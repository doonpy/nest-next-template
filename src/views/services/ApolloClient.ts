import { ApolloClient as ApolloClientOriginal, HttpLink, InMemoryCache } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types';

export default class ApolloClient {
  private static instance: ApolloClient;
  private readonly client: ApolloClientOriginal<NormalizedCacheObject>;

  constructor() {
    this.client = new ApolloClientOriginal<NormalizedCacheObject>({
      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: '/graphql'
      }),
      cache: new InMemoryCache()
    });
  }

  public static getInstance(initialState?: Record<string, any>): ApolloClient {
    if (!this.instance) {
      this.instance = new ApolloClient();
    }

    if (initialState) {
      const existingCache = this.instance.client.extract();
      this.instance.client.cache.restore({ ...existingCache, ...initialState });
    }

    return this.instance;
  }

  public getClient(): ApolloClientOriginal<NormalizedCacheObject> {
    return this.client;
  }

  public getInitialState() {
    return this.client.extract();
  }
}
