import type { NextConfig } from "next";
import pkg from './package.json';
import { withContentlayer } from 'next-contentlayer'

// starts a command line process to get the git hash
import { execSync } from 'child_process';

const commitHash = execSync('git log --pretty=format:"%h" -n1')
  .toString()
  .trim();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    // add the package.json version and git hash to the environment
    APP_VERSION: pkg.version,
    COMMIT_HASH: commitHash,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
};
 
// Merge MDX config with Next.js config
export default withContentlayer(nextConfig)
