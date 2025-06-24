import { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW = 60 * 1000; 
const MAX_REQUESTS = 30; 
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

export function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (real) {
    return real;
  }
  
  return 'unknown';
}

// Rate limiter class for better API usage
class RateLimiter {
  async checkLimit(ip: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const now = Date.now();
    const userLimit = rateLimitMap.get(ip);

    if (!userLimit || now > userLimit.resetTime) {
      const resetTime = now + RATE_LIMIT_WINDOW;
      rateLimitMap.set(ip, { count: 1, resetTime });
      return {
        success: true,
        limit: MAX_REQUESTS,
        remaining: MAX_REQUESTS - 1,
        reset: resetTime,
      };
    }

    if (userLimit.count >= MAX_REQUESTS) {
      return {
        success: false,
        limit: MAX_REQUESTS,
        remaining: 0,
        reset: userLimit.resetTime,
      };
    }

    userLimit.count++;
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - userLimit.count,
      reset: userLimit.resetTime,
    };
  }
}

export const rateLimiter = new RateLimiter();
