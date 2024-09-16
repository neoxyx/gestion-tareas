// middleware.ts
import { NextResponse } from 'next/server';

export function middleware() {
    const response = NextResponse.next();

    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );

    return response;
}

export const config = {
    matcher: '/',
};
