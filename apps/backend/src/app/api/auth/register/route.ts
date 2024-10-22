import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@db/prisma/index';
import * as z from 'zod';

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = registerSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({ message: 'Invalid data provided' }, { status: 400 });
        }

        const { email, password } = parsedBody.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        if (process.env.NODE_ENV === 'development') {
            console.log('New user registered:', newUser);
        }

        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error during registration:', error);
        }

        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
