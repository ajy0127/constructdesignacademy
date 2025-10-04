# Complete Guide: Deploy Your React/Vite Website to AWS

## 📚 Table of Contents
1. [What You'll Build](#what-youll-build)
2. [Prerequisites](#prerequisites)
3. [Understanding the Architecture](#understanding-the-architecture)
4. [Step-by-Step Setup](#step-by-step-setup)
5. [Deploying Your Infrastructure](#deploying-your-infrastructure)
6. [Deploying Your Website](#deploying-your-website)
7. [Updating Your Website](#updating-your-website)
8. [Troubleshooting](#troubleshooting)
9. [Cost Breakdown](#cost-breakdown)
10. [Cleaning Up](#cleaning-up)

---

## 🎯 What You'll Build

By the end of this guide, you'll have:
- ✅ A **React/Vite website** hosted on AWS
- ✅ **S3 bucket** storing your website files
- ✅ **CloudFront CDN** delivering your site globally with HTTPS
- ✅ **Custom domain** (e.g., yourdomain.com) pointing to your site
- ✅ **Route 53** managing your DNS
- ✅ **SSL/TLS certificate** for secure HTTPS connections
- ✅ Automated deployment scripts

**Total setup time:** 30-60 minutes (mostly waiting for AWS)

---

## 📋 Prerequisites

### What You Need Before Starting

1. **An AWS Account**
   - Go to [aws.amazon.com](https://aws.amazon.com)
   - Click "Create an AWS Account"
   - You'll need a credit card (but most of this stays in free tier)

2. **A Domain Name** (Optional but recommended)
   - You can buy one from AWS Route 53, GoDaddy, Namecheap, etc.
   - Cost: ~$10-15/year
   - If you don't have one yet, you can skip domain steps and use the CloudFront URL

3. **Basic Command Line Knowledge**
   - Know how to open Terminal (Mac/Linux) or Command Prompt (Windows)
   - Know how to navigate folders with `cd`

4. **A Computer**
   - Mac, Linux, or Windows (this guide covers all)

---

## 🏗️ Understanding the Architecture

Before we start, let's understand what we're building:

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTPS (your domain)
       ▼
┌─────────────────────┐
│   Route 53 (DNS)    │  ← Translates yourdomain.com to CloudFront
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   CloudFront (CDN)  │  ← Delivers content fast worldwide
└──────┬──────────────┘  ← Handles HTTPS with SSL certificate
       │
       ▼
┌─────────────────────┐
│   S3 Bucket         │  ← Stores your website files
│   (index.html, etc) │
└─────────────────────┘
```

**Why this setup?**
- **S3**: Cheap, reliable storage for static files
- **CloudFront**: Makes your site fast globally + provides HTTPS
- **Route 53**: Professional DNS management
- **ACM Certificate**: Free SSL certificate for HTTPS

---

## 🚀 Step-by-Step Setup

### Step 1: Set Up Your Local Environment

1. **Open Terminal** (Mac/Linux) or **Command Prompt** (Windows)

2. **Navigate to this directory:**
   ```bash
   cd aws-deployment-kit
   ```

3. **Run the bootstrap script:**
   ```bash
   chmod +x scripts/bootstrap.sh
   ./scripts/bootstrap.sh
   ```

   This script will:
   - ✅ Install AWS CLI
   - ✅ Install Node.js (if needed)
   - ✅ Configure your AWS credentials
   - ✅ Create helper scripts

4. **Follow the prompts** to configure AWS CLI

   You'll need:
   - **AWS Access Key ID**: Get from AWS Console → IAM → Users → Your User → Security Credentials
   - **AWS Secret Access Key**: Same place
   - **Default region**: Use `us-east-1` (required for CloudFront certificates)

---

### Step 2: Create Your AWS IAM User (If You Haven't)

If you're using the root account, **STOP**. You should create an IAM user for security.

1. **Go to AWS Console** → Search for "IAM"

2. **Click "Users"** → "Create user"

3. **Username**: `website-deployer` (or your name)

4. **Permissions**: Attach these policies:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
   - `AWSCertificateManagerFullAccess`
   - `AmazonRoute53FullAccess`
   - `CloudFormationFullAccess`

5. **Create access key**:
   - Go to Security Credentials tab
   - Click "Create access key"
   - Choose "Command Line Interface (CLI)"
   - Download the credentials

6. **Configure AWS CLI** with these credentials:
   ```bash
   aws configure
   ```

---

### Step 3: Prepare Your Domain (Optional)

#### Option A: Buy a Domain Through AWS Route 53

1. **Go to AWS Console** → Search for "Route 53"
2. **Click "Registered domains"** → "Register domain"
3. **Search for your domain** and follow the purchase flow
4. **Wait 10-30 minutes** for registration to complete
5. **Skip to Step 5** (Route 53 hosted zone is auto-created)

#### Option B: Use an Existing Domain from Another Registrar

1. **Note your domain name** (e.g., `example.com`)
2. **You'll update nameservers later** (we'll tell you when)

#### Option C: No Domain Yet

- You can still deploy! Just use the CloudFront URL
- You can add a domain later

---

### Step 4: Customize the CloudFormation Template (Optional)

The template in `cloudformation/website-infrastructure.yaml` is ready to use, but you can customize:

1. **Open the file** in any text editor

2. **Review the Parameters section** - you'll provide these values during deployment:
   - `DomainName`: Your domain (e.g., `example.com`)
   - `ProjectName`: A name for your project (e.g., `my-awesome-site`)
   - `CreateHostedZone`: Yes if new domain, No if existing

3. **Optional customizations**:
   - Change `PriceClass` in CloudFront for different global coverage
   - Modify caching behaviors
   - Add additional DNS records

---

## 🎬 Deploying Your Infrastructure

Now the fun part! We'll deploy everything to AWS.

### Method 1: AWS Console (Recommended for Beginners)

1. **Go to AWS Console** → Search for "CloudFormation"

2. **Click "Create stack"** → "With new resources"

3. **Upload template**:
   - Choose "Upload a template file"
   - Click "Choose file"
   - Select `cloudformation/website-infrastructure.yaml`
   - Click "Next"

4. **Fill in the parameters**:
   - **Stack name**: `my-website-stack` (or your choice)
   - **DomainName**: `yourdomain.com` (your actual domain)
   - **ProjectName**: `my-website` (lowercase, no spaces)
   - **CreateHostedZone**: `Yes` (or `No` if you have one)
   - **ExistingHostedZoneId**: Leave blank unless you chose `No` above
   - Click "Next"

5. **Configure stack options**:
   - Leave defaults
   - Click "Next"

6. **Review**:
   - Scroll to bottom
   - ✅ Check "I acknowledge that AWS CloudFormation might create IAM resources"
   - Click "Submit"

7. **Wait for deployment** (20-40 minutes):
   - Status will show "CREATE_IN_PROGRESS"
   - **The certificate validation takes the longest** (20-30 min)
   - Refresh occasionally
   - When status is "CREATE_COMPLETE", you're done! 🎉

### Method 2: AWS CLI (For Advanced Users)

```bash
# Validate template first
./validate-stack.sh

# Deploy the stack
aws cloudformation create-stack \
  --stack-name my-website-stack \
  --template-body file://cloudformation/website-infrastructure.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=yourdomain.com \
    ParameterKey=ProjectName,ParameterValue=my-website \
    ParameterKey=CreateHostedZone,ParameterValue=Yes \
  --capabilities CAPABILITY_IAM

# Monitor progress
aws cloudformation wait stack-create-complete --stack-name my-website-stack
```

---

### Step 5: Update Your Domain's Nameservers

**⚠️ IMPORTANT: Do this step or your domain won't work!**

If you created a new hosted zone, you need to point your domain to AWS nameservers.

1. **Get your nameservers**:
   - Go to CloudFormation → Your stack → Outputs tab
   - Find "HostedZoneNameServers"
   - Copy all 4 nameservers (they look like `ns-123.awsdns-45.com`)

2. **Update at your domain registrar**:

   **If you bought domain through Route 53:**
   - ✅ Already done! Skip this step.

   **If you bought domain elsewhere (GoDaddy, Namecheap, etc):**
   - Log into your domain registrar
   - Find "DNS Settings" or "Nameservers"
   - Choose "Custom nameservers"
   - Enter all 4 AWS nameservers
   - Save changes

3. **Wait for DNS propagation** (5 minutes to 48 hours, usually ~1 hour)
   - You can check status at: [whatsmydns.net](https://www.whatsmydns.net)

---

### Step 6: Verify Certificate Validation

Your SSL certificate needs to be validated before your site works with HTTPS.

1. **Go to AWS Console** → Search for "Certificate Manager"

2. **Click on your certificate**

3. **Check status**:
   - Should say "Issued" (✅ Good!)
   - If "Pending validation" (⏳ Wait 10-30 minutes)

4. **If stuck on pending**:
   - Make sure nameservers are updated (Step 5)
   - Wait longer (can take up to 30 minutes)
   - Check Route 53 for validation records

---

## 📦 Deploying Your Website

Now let's get your actual website files online!

### Step 1: Create or Prepare Your React/Vite Project

#### Option A: Create a New Project

```bash
# Create new Vite project
npm create vite@latest my-website -- --template react

# Navigate into it
cd my-website

# Install dependencies
npm install

# Test it locally
npm run dev
```

Visit `http://localhost:5173` to see your site!

#### Option B: Use Your Existing Project

Make sure your project:
- ✅ Uses Vite as the build tool
- ✅ Has a `build` script in `package.json`
- ✅ Outputs to a `dist` folder

### Step 2: Configure Your Project for SPA Routing

If you're using React Router, add this to your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
```

### Step 3: Build Your Project

```bash
npm run build
```

This creates a `dist` folder with your production-ready files.

### Step 4: Get Your Deployment Info

1. **Go to CloudFormation** → Your stack → Outputs tab

2. **Copy these values**:
   - `WebsiteBucketName`: Your S3 bucket name
   - `CloudFrontDistributionId`: Your CloudFront ID

### Step 5: Deploy Using the Helper Script

```bash
# From your project directory
../aws-deployment-kit/deploy.sh <bucket-name> <distribution-id>

# Example:
../aws-deployment-kit/deploy.sh my-website-123456789 E1234ABCDEFGH
```

This script will:
1. ✅ Build your project
2. ✅ Upload files to S3
3. ✅ Invalidate CloudFront cache
4. ✅ Your site is live!

### Step 6: Visit Your Website!

1. **Go to your domain**: `https://yourdomain.com`

2. **Or use CloudFront URL** (from stack outputs): `https://d123abc.cloudfront.net`

3. **Wait a few minutes** if it doesn't work immediately (CloudFront cache)

🎉 **Congratulations! Your website is live!**

---

## 🔄 Updating Your Website

Every time you make changes:

```bash
# Make your changes to the code

# Deploy
./deploy.sh <bucket-name> <distribution-id>
```

That's it! Your changes will be live in 1-2 minutes.

---

## 🔧 Troubleshooting

### Problem: "Access Denied" when visiting website

**Solution:**
- Wait 5-10 minutes after deployment
- Check CloudFormation stack is "CREATE_COMPLETE"
- Verify certificate is "Issued" in Certificate Manager

### Problem: "This site can't be reached"

**Solution:**
- Check nameservers are updated at your domain registrar
- Wait for DNS propagation (up to 48 hours, usually 1 hour)
- Try CloudFront URL directly (from stack outputs)

### Problem: Certificate stuck on "Pending validation"

**Solution:**
- Verify nameservers are correct in Route 53
- Wait 30 minutes
- Check Route 53 has CNAME validation records
- Make sure you deployed in `us-east-1` region

### Problem: 404 errors on page refresh (React Router)

**Solution:**
- Already handled! The CloudFormation template redirects 404s to index.html
- If still happening, clear CloudFront cache:
  ```bash
  aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
  ```

### Problem: Changes not showing up

**Solution:**
- Clear CloudFront cache (deploy script does this automatically)
- Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Wait 2-3 minutes for cache invalidation

### Problem: AWS CLI not working

**Solution:**
```bash
# Reconfigure AWS CLI
aws configure

# Test it
aws sts get-caller-identity

# Should show your account info
```

### Problem: "Stack failed to create"

**Solution:**
1. Go to CloudFormation → Your stack → Events tab
2. Look for red "FAILED" entries
3. Read the error message
4. Common issues:
   - Domain name format wrong (must be lowercase, valid domain)
   - Region not `us-east-1` (required for certificates)
   - Insufficient permissions (check IAM user)

---

## 💰 Cost Breakdown

Here's what you'll pay (approximate):

| Service | Free Tier | After Free Tier | Notes |
|---------|-----------|-----------------|-------|
| **S3** | 5 GB storage, 20K GET requests | $0.023/GB/month | Very cheap |
| **CloudFront** | 1 TB data transfer, 10M requests | $0.085/GB | First year free |
| **Route 53** | None | $0.50/month per hosted zone | Always charged |
| **Certificate Manager** | FREE | FREE | Always free! |
| **Domain** | N/A | $10-15/year | One-time annual cost |

**Typical monthly cost after free tier:** $1-5/month for a small website

**Tips to minimize costs:**
- Use CloudFront caching effectively
- Compress images before uploading
- Delete old S3 versions periodically

---

## 🧹 Cleaning Up

If you want to delete everything and stop charges:

### Option 1: AWS Console

1. **Empty S3 bucket first**:
   - Go to S3 → Your bucket
   - Click "Empty"
   - Confirm deletion

2. **Delete CloudFormation stack**:
   - Go to CloudFormation → Your stack
   - Click "Delete"
   - Confirm

3. **Wait 10-15 minutes** for everything to be deleted

### Option 2: AWS CLI

```bash
# Empty S3 bucket
aws s3 rm s3://your-bucket-name --recursive

# Delete stack
aws cloudformation delete-stack --stack-name my-website-stack

# Wait for completion
aws cloudformation wait stack-delete-complete --stack-name my-website-stack
```

**Note:** Route 53 hosted zones are NOT deleted automatically. Delete manually if needed:
- Go to Route 53 → Hosted zones
- Select your zone → Delete

---

## 🎓 Next Steps & Best Practices

### Security Best Practices

1. **Enable MFA** on your AWS account
2. **Use IAM users**, never root account
3. **Rotate access keys** every 90 days
4. **Enable CloudTrail** for audit logging

### Performance Optimization

1. **Optimize images**: Use WebP format, compress images
2. **Enable Gzip/Brotli**: Already configured in CloudFront
3. **Code splitting**: Vite does this automatically
4. **Lazy loading**: Use React.lazy() for routes

### Monitoring

1. **CloudWatch**: Monitor CloudFront metrics
2. **S3 access logs**: Track who's accessing your site
3. **CloudFront access logs**: Detailed request logs

### CI/CD Integration

Want automatic deployments? Set up GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://${{ secrets.BUCKET_NAME }} --delete
      - run: aws cloudfront create-invalidation --distribution-id ${{ secrets.DISTRIBUTION_ID }} --paths "/*"
```

---

## 📚 Additional Resources

- [AWS CloudFormation Documentation](https://docs.aws.amazon.com/cloudformation/)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

## 🆘 Getting Help

If you're stuck:

1. **Check the Troubleshooting section** above
2. **AWS Support**: Free tier includes basic support
3. **AWS Forums**: [forums.aws.amazon.com](https://forums.aws.amazon.com)
4. **Stack Overflow**: Tag questions with `aws`, `cloudformation`, `cloudfront`

---

## ✅ Checklist

Use this to track your progress:

- [ ] AWS account created
- [ ] IAM user created with proper permissions
- [ ] Domain purchased (optional)
- [ ] Bootstrap script run successfully
- [ ] AWS CLI configured
- [ ] CloudFormation stack deployed
- [ ] Nameservers updated at domain registrar
- [ ] Certificate validated (status: Issued)
- [ ] React/Vite project created or prepared
- [ ] Website built and deployed to S3
- [ ] Website accessible at domain
- [ ] Deploy script working for updates

---

**🎉 You did it! You now have a professional, scalable website hosting setup on AWS!**

This infrastructure can handle millions of visitors, scales automatically, and costs just a few dollars per month. You've learned valuable cloud skills that apply to real-world production systems.

Happy building! 🚀
