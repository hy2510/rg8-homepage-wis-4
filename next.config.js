/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wcfresource.a1edu.com",
      },
      {
        protocol: "http",
        hostname: "wcfresource.a1edu.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/Library/DodoABCWorkSheetMP3',
        has: [
          {
            type: 'query',
            key:'CoursesName'
          }
        ],
        destination: 'https://util.readinggate.com/Library/DodoABCWorkSheetMP3',
        permanent: false
      },
      {
        source: '/Library/DodoABCWorkSheetQR',
        has: [
          {
            type: 'query',
            key:'LevelName'
          }
        ],
        destination: 'https://util.readinggate.com/Library/DodoABCWorkSheetQR',
        permanent: false
      },
      {
        source: '/Main/Index',
        destination: '/',
        permanent: false
      }
    ]
  }
};

module.exports = nextConfig;
