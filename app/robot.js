const BASE_URL = "https://aetherrfid.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin", // admin dashboard shown in screenshot — must stay out of index
          "/api/", // internal API routes, if any
          "/*?*", // block URLs with query params (filters, tracking params) from being indexed
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
