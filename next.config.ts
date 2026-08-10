import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Trailing-slash-free URLs keep exactly one canonical form per route.
  trailingSlash: false,

  async redirects() {
    // The previous site was one page addressed entirely by hash, and hashes
    // never reach the server — so these only catch inbound links that were
    // written as real paths. The hash equivalents are handled client-side in
    // src/components/legacy-hash-redirect.tsx.
    return [
      { source: "/projects", destination: "/work", permanent: true },
      { source: "/skills", destination: "/about", permanent: true },
      { source: "/experience", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
