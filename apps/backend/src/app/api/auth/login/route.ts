import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import prisma from '@db/prisma/index';
import * as z from 'zod';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRY = '30d';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = loginSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }

        const { email, password } = parsedBody.data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });

        const cookie = serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: COOKIE_MAX_AGE,
        });

        const response = NextResponse.json({ message: 'Login successful' });
        response.headers.set('Set-Cookie', cookie);

        return response;
    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Login error:', error);
        }

        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
