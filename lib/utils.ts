import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate Gravatar URL from Email Address
 * @param email 用户邮箱地址
 * @param size 头像大小（像素）
 * @param defaultImage 默认头像类型，如404, mp, identicon, monsterid, wavatar, retro, robohash, blank
 * @returns Gravatar URL
 */
export function getGravatarUrl(email: string, size: number = 80, defaultImage: string = 'mp'): string {
  if (!email) {
    return `/images/avatar.png`;
  }
  
  // Convert Email to Lowercase and Remove Leading/Trailing Spaces
  const normalizedEmail = email.trim().toLowerCase();
  
  // Calculate MD5 Hash
  const hash = crypto.createHash('md5').update(normalizedEmail).digest('hex');
  
  // Building Gravatar URLs - Using Alternative Endpoints
  // Available Endpoints:
  // - https://www.gravatar.com/avatar/ (blocked)
  // - https://secure.gravatar.com/avatar/ (blocked)
  // - https://cn.gravatar.com/avatar/ (China-specific, blocked)
  // - https://gravatar.loli.net/avatar/ (mirror service)
  return `https://gravatar.loli.net/avatar/${hash}?s=${size}&d=${defaultImage}`;
}
