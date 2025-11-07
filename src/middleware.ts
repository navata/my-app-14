import {NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const headers = request.headers;
  const logData = {
    ip: headers.get('x-forwarded-for'),
    host: headers.get('x-forwarded-host'),
    url: request.url,
    referer: headers.get('referer'),
    userAgent: headers.get('user-agent')
  };

  console.warn(
    JSON.stringify(
      {
        timestamp: new Date().toLocaleString('vi-VN', {
          timeZone: 'Asia/Ho_Chi_Minh'
        }),
        level: 'INFO',
        context: 'Request information',
        data: logData
      },
      null
    )
  );

  const response = handleI18nRouting(request);
  response.headers.set('Cache-Control', 'public, max-age=20');

  return response;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
