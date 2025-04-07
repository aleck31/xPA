import { defineStorage } from '@aws-amplify/backend';

/**
 * Define and configure your storage resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/storage/
 */
export const storage = defineStorage({
  name: 'xpaStorage',
  access: (allow: any) => ({
    // Allow authenticated users to create, read, update their own content
    authenticated: allow.user().to(['create', 'read', 'update', 'delete']),
  }),
});
