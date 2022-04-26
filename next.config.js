/** @type {import('next').NextConfig} */

const nextConfig = {
   reactStrictMode: true,
   target: "serverless",
   // async redirects() {
   //    return [
   //       {
   //          source: "/workit",
   //          destination: "/",
   //          permanent: true,
   //       },
   //    ];
   // },
};

module.exports = nextConfig;
