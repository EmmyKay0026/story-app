/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.fanscornernow.com",
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
          "/bookmark",
          "/my-reads",
          "/profile",
          "/story",
          "/api",
          "/api/*",
        ],
      },
    ],
  },
};

module.exports = config;
