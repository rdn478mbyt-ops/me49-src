import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/faq",
        destination: "/nous-rencontrer#faq",
        permanent: false,
      },
      {
        source: "/questions-frequentes",
        destination: "/nous-rencontrer#faq",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
