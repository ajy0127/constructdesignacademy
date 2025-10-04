# AWS Website Deployment Kit 🚀

**Deploy your React/Vite website to AWS in 30 minutes** with S3, CloudFront, Route 53, and HTTPS!

This complete deployment package includes everything you need to host a professional, scalable website on AWS - even if you've never used AWS before.

---

## 📦 What's Included

```
aws-deployment-kit/
├── README.md                          ← You are here
├── GUIDE.md                           ← Complete step-by-step tutorial
├── cloudformation/
│   └── website-infrastructure.yaml    ← AWS infrastructure template
├── scripts/
│   ├── bootstrap.sh                   ← Environment setup script
│   ├── deploy.sh                      ← Quick deployment script
│   └── validate-stack.sh              ← Template validation
└── examples/
    ├── vite.config.js                 ← Optimized Vite configuration
    ├── package.json                   ← Example dependencies
    ├── deploy-to-aws.js               ← Node.js deployment script
    ├── .env.example                   ← Environment variables template
    ├── App.jsx                        ← Example React component
    └── App.css                        ← Example styles
```

---

## ✨ Features

### What You Get

- ✅ **S3 Static Hosting** - Reliable, scalable storage for your website
- ✅ **CloudFront CDN** - Lightning-fast global content delivery
- ✅ **Route 53 DNS** - Professional domain management
- ✅ **Free SSL Certificate** - Automatic HTTPS with AWS Certificate Manager
- ✅ **SPA Support** - Proper routing for React Router and other SPAs
- ✅ **Automated Deployment** - One-command deployments
- ✅ **Cache Invalidation** - Automatic CloudFront cache clearing
- ✅ **Security Best Practices** - Origin Access Control, secure headers
- ✅ **Cost Optimized** - Free tier eligible, ~$1-5/month after

### Infrastructure Highlights

- **Global CDN**: Your site loads fast from anywhere in the world
- **Auto-scaling**: Handles traffic spikes automatically
- **99.99% Uptime**: AWS's industry-leading reliability
- **HTTPS Everywhere**: Secure by default with free SSL
- **Version Control**: S3 versioning enabled for rollbacks
- **Production Ready**: Used by companies of all sizes

---

## 🚀 Quick Start

### 1. Run the Bootstrap Script

```bash
cd aws-deployment-kit
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
```

This will:
- Install AWS CLI
- Install Node.js (if needed)
- Configure your AWS credentials
- Create helper scripts

### 2. Read the Complete Guide

Open `GUIDE.md` for the full step-by-step tutorial. It covers:
- Creating your AWS account
- Buying/configuring a domain
- Deploying the CloudFormation stack
- Building and deploying your website
- Troubleshooting common issues

### 3. Deploy Your Infrastructure

**Option A: AWS Console (Recommended for beginners)**
1. Go to AWS CloudFormation
2. Create new stack
3. Upload `cloudformation/website-infrastructure.yaml`
4. Fill in parameters (domain, project name)
5. Wait 30-40 minutes for deployment

**Option B: AWS CLI**
```bash
aws cloudformation create-stack \
  --stack-name my-website \
  --template-body file://cloudformation/website-infrastructure.yaml \
  --parameters \
    ParameterKey=DomainName,ParameterValue=yourdomain.com \
    ParameterKey=ProjectName,ParameterValue=my-website \
    ParameterKey=CreateHostedZone,ParameterValue=Yes
```

### 4. Deploy Your Website

```bash
# Build your React/Vite project
npm run build

# Deploy to AWS
./deploy.sh <bucket-name> <distribution-id>
```

Get bucket name and distribution ID from CloudFormation stack outputs.

---

## 📚 Documentation

### Main Guide
**[GUIDE.md](GUIDE.md)** - Complete tutorial with:
- Prerequisites and setup
- Architecture explanation
- Step-by-step deployment
- Troubleshooting
- Cost breakdown
- Best practices

### CloudFormation Template
**[cloudformation/website-infrastructure.yaml](cloudformation/website-infrastructure.yaml)**
- Fully documented infrastructure as code
- Customizable parameters
- Production-ready configuration
- Security best practices

### Example Files
**[examples/](examples/)** - Sample configurations:
- `vite.config.js` - Optimized Vite build settings
- `package.json` - Required dependencies
- `deploy-to-aws.js` - Automated deployment script
- `App.jsx` - Starter React component

---

## 💰 Cost Estimate

### Free Tier (First 12 Months)
- **S3**: 5 GB storage, 20,000 GET requests
- **CloudFront**: 1 TB data transfer, 10M requests
- **Route 53**: $0.50/month (not free)
- **Certificate Manager**: FREE forever

### After Free Tier
- **S3**: ~$0.10-0.50/month (small site)
- **CloudFront**: ~$0.50-2.00/month (normal traffic)
- **Route 53**: $0.50/month
- **Domain**: ~$10-15/year

**Total: $1-5/month** for most small-to-medium websites

---

## 🎯 Who Is This For?

### Perfect For:
- ✅ Developers learning AWS
- ✅ Personal portfolio websites
- ✅ Small business websites
- ✅ Landing pages and marketing sites
- ✅ React/Vue/Angular single-page apps
- ✅ Static site generators (Gatsby, Next.js static export)

### Not Ideal For:
- ❌ Server-side rendering (use AWS Amplify or EC2)
- ❌ Backend APIs (use API Gateway + Lambda)
- ❌ Databases (use RDS or DynamoDB separately)
- ❌ Real-time applications (use WebSockets on EC2)

---

## 🛠️ Requirements

### Before You Start
- **AWS Account** (free to create)
- **Domain name** (optional, ~$10-15/year)
- **Basic terminal knowledge**
- **Node.js** (installed by bootstrap script)
- **AWS CLI** (installed by bootstrap script)

### Supported Platforms
- ✅ macOS
- ✅ Linux
- ✅ Windows (with WSL or Git Bash)

---

## 📖 Step-by-Step Workflow

### Initial Setup (One Time)
1. Run `bootstrap.sh` to set up your environment
2. Create AWS account and IAM user
3. Buy or configure domain
4. Deploy CloudFormation stack
5. Update nameservers at domain registrar
6. Wait for certificate validation

### Regular Deployments (Every Update)
1. Make changes to your React app
2. Run `npm run build`
3. Run `./deploy.sh <bucket> <distribution-id>`
4. Wait 1-2 minutes for cache invalidation
5. Your site is updated!

---

## 🔧 Customization

### CloudFormation Parameters

You can customize the infrastructure by modifying parameters:

- **DomainName**: Your custom domain
- **ProjectName**: Used for resource naming
- **CreateHostedZone**: Create new or use existing Route 53 zone
- **ExistingHostedZoneId**: If using existing zone

### Vite Configuration

Customize `examples/vite.config.js` for:
- Code splitting strategy
- Build optimization
- Source maps
- Asset handling

### Deployment Scripts

Modify `scripts/deploy.sh` or `examples/deploy-to-aws.js` to:
- Add pre-deployment checks
- Run tests before deployment
- Send notifications
- Integrate with CI/CD

---

## 🚨 Troubleshooting

### Common Issues

**Certificate stuck on "Pending validation"**
- Wait 30 minutes (it's slow)
- Check nameservers are updated
- Verify Route 53 has validation records

**Website shows "Access Denied"**
- Wait 5-10 minutes after deployment
- Check CloudFormation stack is complete
- Verify S3 bucket policy is correct

**Changes not showing up**
- Clear CloudFront cache (deploy script does this)
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Wait 2-3 minutes for invalidation

**404 on page refresh (React Router)**
- Already handled in CloudFormation template
- Verify CloudFront error responses are configured

See **[GUIDE.md](GUIDE.md)** for detailed troubleshooting.

---

## 🔒 Security Best Practices

### Included in Template
- ✅ Origin Access Control (OAC) for S3
- ✅ HTTPS-only (HTTP redirects to HTTPS)
- ✅ TLS 1.2+ minimum
- ✅ Security headers policy
- ✅ S3 bucket encryption
- ✅ S3 versioning enabled

### Additional Recommendations
- Use IAM users, not root account
- Enable MFA on AWS account
- Rotate access keys every 90 days
- Enable CloudTrail for audit logs
- Set up billing alerts

---

## 📈 Performance Optimization

### Already Optimized
- ✅ CloudFront caching
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 and HTTP/3
- ✅ Global edge locations
- ✅ Optimized cache policies

### Additional Tips
- Optimize images (WebP format)
- Use code splitting (Vite does this)
- Lazy load components
- Minimize bundle size
- Use React.lazy() for routes

---

## 🔄 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - run: |
          aws s3 sync dist/ s3://${{ secrets.BUCKET_NAME }} --delete
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.DISTRIBUTION_ID }} \
            --paths "/*"
```

---

## 🧹 Cleaning Up

To delete everything and stop charges:

```bash
# Empty S3 bucket first
aws s3 rm s3://your-bucket-name --recursive

# Delete CloudFormation stack
aws cloudformation delete-stack --stack-name my-website-stack

# Manually delete Route 53 hosted zone if needed
```

**Note:** Route 53 hosted zones are not auto-deleted.

---

## 📚 Additional Resources

### AWS Documentation
- [CloudFormation User Guide](https://docs.aws.amazon.com/cloudformation/)
- [CloudFront Developer Guide](https://docs.aws.amazon.com/cloudfront/)
- [S3 User Guide](https://docs.aws.amazon.com/s3/)
- [Route 53 Developer Guide](https://docs.aws.amazon.com/route53/)

### Learning Resources
- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Training](https://aws.amazon.com/training/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

---

## 🤝 Support

### Getting Help
- Read the [GUIDE.md](GUIDE.md) for detailed instructions
- Check the Troubleshooting section
- AWS Support (free tier includes basic support)
- [AWS Forums](https://forums.aws.amazon.com)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/aws)

---

## 📝 License

This deployment kit is provided as-is for educational and commercial use. Feel free to modify and distribute.

---

## 🎉 What's Next?

After deploying your website:

1. **Customize your site** - Replace example content with your own
2. **Add features** - Install UI libraries, add pages, etc.
3. **Set up monitoring** - Use CloudWatch for metrics
4. **Enable logging** - Track access with S3/CloudFront logs
5. **Add analytics** - Google Analytics, Plausible, etc.
6. **Set up CI/CD** - Automate deployments with GitHub Actions
7. **Optimize performance** - Compress images, lazy load components
8. **Add more services** - API Gateway, Lambda, DynamoDB, etc.

---

## ✅ Quick Checklist

Use this to track your progress:

- [ ] AWS account created
- [ ] IAM user created
- [ ] Domain purchased (optional)
- [ ] Bootstrap script run
- [ ] AWS CLI configured
- [ ] CloudFormation stack deployed
- [ ] Nameservers updated
- [ ] Certificate validated
- [ ] Website deployed
- [ ] Site accessible at domain

---

**Ready to get started?** Open [GUIDE.md](GUIDE.md) and follow the step-by-step tutorial!

**Questions?** Everything is explained in detail in the guide, including troubleshooting for common issues.

**Happy deploying!** 🚀
