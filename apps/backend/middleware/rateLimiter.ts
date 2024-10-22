import rateLimit from 'express-rate-limit';
import { NextResponse, NextRequest } from 'next/server';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

export function rateLimiter() {
    return (req: NextRequest, res: NextResponse) => {
        return new Promise((resolve) => {
            limiter(req as any, res as any, (result: any) => {
                if (result instanceof Error) {
                    resolve(new NextResponse(result.message, { status: 429 }));
                } else {
                    resolve(res);
                }
            });
        });
    };
}