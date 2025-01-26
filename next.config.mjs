/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xcoqcnkvmsfttacrpyrn.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
        search: "",
      },
    ],
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
