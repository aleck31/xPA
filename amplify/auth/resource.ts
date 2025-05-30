import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    email: {
      required: true
    },
    preferredUsername: {
      mutable: true,
      required: false
    },
    givenName: {
      required: true,
    },
  },
});

//Use existing Cognito User Pool  
// export const auth = referenceAuth({
//   // Required fields for referenceAuth
//   userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || 'ap-southeast-1_placeholder',
//   userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || 'placeholder-client-id',
//   identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || 'ap-southeast-1:placeholder-identity-pool-id',
//   authRoleArn: process.env.AMPLIFY_AUTH_ROLE_ARN || 'arn:aws:iam::placeholder:role/amplify-xPA-auth-role',
//   unauthRoleArn: process.env.AMPLIFY_UNAUTH_ROLE_ARN || 'arn:aws:iam::placeholder:role/amplify-xPA-unauth-role'
// });
