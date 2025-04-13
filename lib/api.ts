import { generateClient } from 'aws-amplify/api';
import { type Schema } from '../amplify/data/resource';
import { GraphQLResult } from '@aws-amplify/api';

const client = generateClient<Schema>();

export async function queryData<T>(query: string, variables?: Record<string, unknown>) {
  try {
    const response = await client.graphql({
      query,
      variables: variables as any,
    }) as GraphQLResult<T>;

    if (!response.data) {
      throw new Error('No data returned from query');
    }

    return response.data;
  } catch (error) {
    console.error('Error querying data:', error);
    throw error;
  }
}

export async function mutateData<T>(mutation: string, variables?: Record<string, unknown>) {
  try {
    const response = await client.graphql({
      query: mutation,
      variables: variables as any,
    }) as GraphQLResult<T>;

    if (!response.data) {
      throw new Error('No data returned from mutation');
    }

    return response.data;
  } catch (error) {
    console.error('Error mutating data:', error);
    throw error;
  }
} 