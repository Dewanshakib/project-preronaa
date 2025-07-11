import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
    const cookie = await cookies()
    const token = cookie.get("next-auth.session-token")?.value

    const path = request.nextUrl.pathname
    const isPublicRoute = path === '/login' || path === '/register' || path === '/forget-password' || path === '/reset-password'

    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isPublicRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


}

export const config = {
    matcher: ['/', '/login', '/register', '/profile/:id','/profile/edit/:id','/forget-password', '/reset-password','/create']
}