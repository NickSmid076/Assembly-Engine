/** @type {import('next').NextConfig} */
// NEXT_DIST_DIR lets a production build (e.g. for Lighthouse in ae-visual-qa) run next to `npm run dev`.
const nextConfig = { reactStrictMode: true, distDir: process.env.NEXT_DIST_DIR || ".next" };
export default nextConfig;
