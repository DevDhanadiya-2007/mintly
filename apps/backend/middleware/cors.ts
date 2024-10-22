import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const allowedOrigins = [
    'http://localhost:3000',
    'https://your-production-domain.com', // Replace with your production domain
];

export function corsMiddleware(req: NextRequest) {
    const origin = req.headers.get('origin') || '';
    const isAllowedOrigin = allowedOrigins.includes(origin);

    // Always return a new response to ensure headers are set
    const response = NextResponse.next();

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 204,
            headers: response.headers
        });
    }

    return response;
}