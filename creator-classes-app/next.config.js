/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env : {
    INSIGHTS_INSTRUMENTATIONKEY: process.env.NEXT_PUBLIC_INSIGHTS_INSTRUMENTATIONKEY
  }
}

module.exports = nextConfig
