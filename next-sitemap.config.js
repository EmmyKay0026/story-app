/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  exclude: ["/my-reads", "/bookmark", "/profile", "/api/*"],
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "*",
        disallow: [
          "/login",
          "/signup",
          "/bookmark",
          "/my-reads",
          "/profile",
          "/api",
          "/api/*",
        ],
      },
    ],
  },
};

module.exports = config;
