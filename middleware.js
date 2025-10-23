// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = req.headers.get('x-token');
  if (!token) {
    return new NextResponse('Token not found', { status: 400 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // You can attach user data to request headers if needed
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user', JSON.stringify(payload.user));

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (err) {
    console.error('JWT verification failed:', err);
    return new NextResponse('Invalid or expired token', { status: 401 });
  }
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'], // define where to apply middleware
};
