require("dotenv").config({ path: `${process.env.ENVIRONMENT}` });

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT ?? "production",
    API_URL: process.env.API_URL ?? "http://localhost:3000",
    API_TMDB_IMG: process.env.API_TMDB_IMG ?? "https://image.tmdb.org/t/p/w500",
  },
};

module.exports = nextConfig;
