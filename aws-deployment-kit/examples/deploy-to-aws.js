#!/usr/bin/env node

/**
 * Automated deployment script for AWS
 * 
 * Usage:
 *   1. Set environment variables:
 *      export AWS_BUCKET_NAME="your-bucket-name"
 *      export AWS_DISTRIBUTION_ID="your-cloudfront-id"
 *   
 *   2. Run: npm run deploy
 * 
 * Or use the provided deploy.sh script in the parent directory
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function error(message) {
  log(`✗ ${message}`, colors.red);
  process.exit(1);
}

function success(message) {
  log(`✓ ${message}`, colors.green);
}

function info(message) {
  log(`ℹ ${message}`, colors.blue);
}

function warning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

// Get configuration from environment variables
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const DISTRIBUTION_ID = process.env.AWS_DISTRIBUTION_ID;

// Validate configuration
if (!BUCKET_NAME || !DISTRIBUTION_ID) {
  error('Missing required environment variables!');
  console.log('\nPlease set:');
  console.log('  export AWS_BUCKET_NAME="your-bucket-name"');
  console.log('  export AWS_DISTRIBUTION_ID="your-cloudfront-id"');
  console.log('\nOr use the deploy.sh script instead.');
  process.exit(1);
}

// Check if dist folder exists
if (!existsSync('./dist')) {
  error('Build folder (dist) not found. Run "npm run build" first.');
}

try {
  // Step 1: Sync files to S3
  info('Uploading files to S3...');
  execSync(
    `aws s3 sync dist/ s3://${BUCKET_NAME} --delete --cache-control "public,max-age=31536000,immutable"`,
    { stdio: 'inherit' }
  );
  success('Files uploaded to S3');

  // Step 2: Invalidate CloudFront cache
  info('Invalidating CloudFront cache...');
  const result = execSync(
    `aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/*"`,
    { encoding: 'utf-8' }
  );
  
  const invalidation = JSON.parse(result);
  const invalidationId = invalidation.Invalidation.Id;
  
  success(`CloudFront cache invalidation created: ${invalidationId}`);

  // Step 3: Done!
  console.log('\n' + '='.repeat(50));
  success('Deployment complete!');
  console.log('='.repeat(50));
  info('Your website will be live in 1-2 minutes.');
  
} catch (err) {
  error(`Deployment failed: ${err.message}`);
}
