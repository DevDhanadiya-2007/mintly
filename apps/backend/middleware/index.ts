import { NextRequest, NextResponse } from 'next/server';
import { corsMiddleware } from './cors';
import { securityMiddleware } from './securityHeaders';
import { rateLimiter } from './rateLimiter';

export async function middleware(req: NextRequest) {
    // Apply CORS middleware first
    const corsResponse = corsMiddleware(req);

    // If it's an OPTIONS request, return the CORS response immediately
    if (req.method === 'OPTIONS') {
        return corsResponse;
    }

    // Apply rate limiter
    const rateLimitResponse = await rateLimiter()(req, corsResponse);
    if (rateLimitResponse instanceof NextResponse) return rateLimitResponse;

    // Apply security headers
    const securityHeaders = securityMiddleware();
    securityHeaders.forEach((value, key) => {
        corsResponse.headers.set(key, value);
    });

    return corsResponse;
}

export const config = {
    matcher: '/api/:path*',
};