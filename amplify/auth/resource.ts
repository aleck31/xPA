import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  resources: {
    userPool: {
      type: AuthResources.COGNITO_USER_POOL_REFERENCE,
      options: {
        userPoolId: 'ap-southeast-1_WBHlZF1Zf',
      }
    },
    userPoolClient: {
      type: AuthResources.COGNITO_USER_POOL_CLIENT_REFERENCE,
      options: {
        userPoolClientId: '1a30q7fmhmlqotc1abo9493bk2', // 替换为你的 App Client ID
      }
    }
  }
});
