import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  console.log('IP: ', request?.headers?.get?.('x-forwarded-for'));
  console.log('referer: ', request?.headers?.get?.('referer'));
  const url = request.nextUrl;
  const { pathname } = url;

  request.cookies.set('COOKE_PATH_NAME', pathname);

  const response = NextResponse.next();
  response.cookies.set(
  	"newCookie",
  	"004"
  );
  response.cookies.set('pmc-user-token', 'vi');
  response.cookies.set('COOKE_PATH_NAME', pathname);

  return response
}



