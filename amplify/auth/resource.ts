import { referenceAuth } from "@aws-amplify/backend";

/**
 * Reference an existing auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = referenceAuth({
  // Use existing Cognito User Pool  
  userPoolId: process.env.MY_USER_POOL_ID || 'ap-southeast-1_placeholder',
  userPoolClientId: process.env.MY_USER_POOL_CLIENT_ID || 'placeholder-client-id',
  // Required fields for referenceAuth
  identityPoolId: process.env.MY_IDENTITY_POOL_ID || 'ap-southeast-1:placeholder-identity-pool-id',
  authRoleArn: process.env.MY_AUTH_ROLE_ARN || 'arn:aws:iam::placeholder:role/amplify-xPA-auth-role',
  unauthRoleArn: process.env.MY_UNAUTH_ROLE_ARN || 'arn:aws:iam::placeholder:role/amplify-xPA-unauth-role'
});
