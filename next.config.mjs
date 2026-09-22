/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://76.13.209.182:8000';

const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/storage/:path*',
        destination: `${supabaseUrl}/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
