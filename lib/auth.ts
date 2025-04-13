import { getCurrentUser, signOut as amplifySignOut } from 'aws-amplify/auth';

// 初始化 Amplify Auth 配置
export const configureAuth = () => {
  // 注意：这里我们只使用客户端可访问的环境变量
  // 服务器端的环境变量会在 API 路由中使用
  return {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  };
};

// 获取当前用户信息
export const getCurrentUserInfo = async () => {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    return {
      username,
      userId,
      signInDetails,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// 登出
export const signOut = async () => {
  try {
    await amplifySignOut();
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
}; 