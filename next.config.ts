import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASEPATH || '',
  env: {
    NEXT_PUBLIC_BASEPATH: process.env.NEXT_PUBLIC_BASEPATH || '',
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/en/home',
        permanent: true
      },
      {
        source: '/:lang(en|fr|ar)',
        destination: '/:lang/home',
        permanent: true
      },
      {
        source: '/:path((?!en|fr|ar|front-pages|images|api|favicon.ico).*)*',
        destination: '/en/:path*',
        permanent: true
      }
    ]
  }
}

export default nextConfig
