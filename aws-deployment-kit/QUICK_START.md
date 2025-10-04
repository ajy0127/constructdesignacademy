# Quick Start Guide - 5 Minutes

**Too busy to read the full guide?** Here's the absolute minimum to get started.

---

## ⚡ Super Quick Setup

### 1. Bootstrap (2 minutes)
```bash
cd aws-deployment-kit
chmod +x scripts/bootstrap.sh
./scripts/bootstrap.sh
```
Follow prompts to configure AWS credentials.

### 2. Deploy Infrastructure (30-40 minutes, mostly waiting)
1. Go to [AWS CloudFormation Console](https://console.aws.amazon.com/cloudformation)
2. Click **Create stack** → **With new resources**
3. Upload `cloudformation/website-infrastructure.yaml`
4. Fill in:
   - **Stack name**: `my-website`
   - **DomainName**: `yourdomain.com`
   - **ProjectName**: `my-website`
   - **CreateHostedZone**: `Yes`
5. Click **Next** → **Next** → Check the IAM acknowledgment → **Submit**
6. ☕ Wait 30-40 minutes

### 3. Update Nameservers (5 minutes)
1. Go to CloudFormation → Your stack → **Outputs** tab
2. Copy the 4 nameservers from **HostedZoneNameServers**
3. Go to your domain registrar (GoDaddy, Namecheap, etc.)
4. Update nameservers to the AWS ones
5. Wait 10-60 minutes for DNS propagation

### 4. Deploy Your Website (2 minutes)
```bash
# In your React/Vite project
npm run build

# Deploy (get values from CloudFormation Outputs tab)
../aws-deployment-kit/deploy.sh <bucket-name> <distribution-id>
```

### 5. Visit Your Site! 🎉
Go to `https://yourdomain.com`

---

## 📋 What You Need

- AWS account
- Domain name (or use CloudFront URL)
- React/Vite project
- 30-60 minutes total time

---

## 🆘 If Something Goes Wrong

Read the full **[GUIDE.md](GUIDE.md)** - it has detailed troubleshooting for every step.

Common issues:
- **Certificate stuck?** Wait 30 minutes, check nameservers
- **Access Denied?** Wait 10 minutes after deployment
- **Changes not showing?** Clear cache, hard refresh browser

---

## 💡 Pro Tips

1. **Use `us-east-1` region** for CloudFormation (required for certificates)
2. **Save your bucket name and distribution ID** from Outputs tab
3. **Create `.env` file** with these values for easier deployments
4. **Set up GitHub Actions** for automatic deployments (see README.md)

---

**Need more details?** Read the complete [GUIDE.md](GUIDE.md) for step-by-step instructions with screenshots and explanations.
