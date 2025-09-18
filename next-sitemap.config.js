/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://adeelaliyousaf.vercel.app",
  generateRobotsTxt: true,                   
  changefreq: "monthly",                    
  priority: 0.8,                            
  autoLastmod: true,                         
  sitemapSize: 5000,
  exclude: ["/404", "/500", "/api/*"],                 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",                           
        disallow: ["/api"],       
      },
    ],
  },
};
