import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  console.log('IP: ', request?.headers?.get?.('x-forwarded-for'));
  console.log('referer: ', request?.headers?.get?.('referer'));
}
