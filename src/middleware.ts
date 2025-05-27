import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('isNewUser');
  if (cookie?.value === 'true' && !request.url.includes('/survey')) {
    console.log(request.url);
    return NextResponse.redirect(new URL('/survey', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
