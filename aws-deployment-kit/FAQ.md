# Frequently Asked Questions (FAQ)

## General Questions

### Q: Do I need to know AWS to use this?
**A:** No! This kit is designed for beginners. The step-by-step guide walks you through everything. You'll learn AWS along the way.

### Q: How much does this cost?
**A:** 
- **First 12 months**: ~$0.50-1/month (mostly Route 53)
- **After free tier**: ~$1-5/month for small-to-medium traffic
- **Domain**: ~$10-15/year (one-time annual cost)

See the [Cost Breakdown](GUIDE.md#cost-breakdown) section for details.

### Q: Is this production-ready?
**A:** Yes! This setup is used by companies of all sizes. It's reliable, secure, and scalable.

### Q: Can I use this for my business website?
**A:** Absolutely! This infrastructure can handle professional websites with thousands of visitors.

---

## Setup Questions

### Q: I don't have a domain yet. Can I still deploy?
**A:** Yes! You can use the CloudFront URL (e.g., `d123abc.cloudfront.net`) until you buy a domain. You can add a domain later.

### Q: Can I use a domain I already own?
**A:** Yes! You can either:
1. Transfer it to Route 53, or
2. Keep it at your current registrar and just update nameservers

### Q: Which AWS region should I use?
**A:** **Use `us-east-1`** (US East - N. Virginia). This is required for CloudFront SSL certificates. Your content will still be delivered globally via CloudFront.

### Q: Do I need a credit card for AWS?
**A:** Yes, AWS requires a credit card even for the free tier. But you won't be charged much (if at all) in the first year.

### Q: How long does setup take?
**A:** 
- **Active work**: 15-20 minutes
- **Waiting for AWS**: 30-40 minutes (mostly certificate validation)
- **Total**: 45-60 minutes

---

## Technical Questions

### Q: What if I'm not using React/Vite?
**A:** This works with any static site generator:
- ✅ React (Create React App, Vite)
- ✅ Vue (Vue CLI, Vite)
- ✅ Angular
- ✅ Svelte
- ✅ Next.js (static export)
- ✅ Gatsby
- ✅ Plain HTML/CSS/JS

Just make sure your build outputs to a `dist` or `build` folder.

### Q: Can I use this for server-side rendering (SSR)?
**A:** No, this is for static sites only. For SSR, consider:
- AWS Amplify
- AWS Elastic Beanstalk
- AWS EC2 with Node.js
- Vercel or Netlify

### Q: Does this support environment variables?
**A:** For build-time variables (e.g., API URLs), yes:
```bash
VITE_API_URL=https://api.example.com npm run build
```

For runtime variables, you'll need a backend (Lambda, API Gateway).

### Q: Can I add a backend API?
**A:** Yes, but it's separate. Common approaches:
1. **API Gateway + Lambda**: Serverless API
2. **EC2**: Traditional server
3. **Third-party**: Firebase, Supabase, etc.

This kit focuses on the frontend hosting.

### Q: How do I handle forms?
**A:** Options:
1. **Third-party services**: Formspree, Netlify Forms, Google Forms
2. **AWS Lambda**: Create API endpoint for form handling
3. **Email services**: SendGrid, AWS SES

### Q: Can I use a database?
**A:** Not directly with this setup. You'd need:
- **AWS RDS**: Relational database
- **DynamoDB**: NoSQL database
- **Third-party**: Firebase, MongoDB Atlas, Supabase

---

## Deployment Questions

### Q: How do I update my website?
**A:** Simple:
```bash
npm run build
./deploy.sh <bucket-name> <distribution-id>
```
Changes are live in 1-2 minutes.

### Q: Can I automate deployments?
**A:** Yes! Use GitHub Actions (example included) or other CI/CD tools:
- GitHub Actions
- GitLab CI
- CircleCI
- Jenkins

### Q: What if I make a mistake and want to rollback?
**A:** S3 versioning is enabled. You can:
1. Restore previous version from S3 console
2. Re-deploy a previous build
3. Use Git to checkout previous code and redeploy

### Q: How do I deploy to multiple environments (dev, staging, prod)?
**A:** Deploy multiple CloudFormation stacks:
```bash
# Dev environment
aws cloudformation create-stack --stack-name my-website-dev ...

# Prod environment
aws cloudformation create-stack --stack-name my-website-prod ...
```

Each gets its own S3 bucket, CloudFront distribution, and domain.

---

## Domain & DNS Questions

### Q: Where should I buy my domain?
**A:** Options:
1. **AWS Route 53**: Easiest (auto-configures DNS)
2. **Namecheap**: Popular, affordable
3. **GoDaddy**: Well-known
4. **Google Domains**: Simple interface

All work fine. Route 53 is easiest for this setup.

### Q: How long does DNS propagation take?
**A:** 
- **Typical**: 10-60 minutes
- **Maximum**: Up to 48 hours
- **Check status**: [whatsmydns.net](https://www.whatsmydns.net)

### Q: Can I use a subdomain (e.g., blog.example.com)?
**A:** Yes! Just modify the CloudFormation parameters:
- `DomainName`: `blog.example.com`
- Make sure your hosted zone is for `example.com`

### Q: Can I use multiple domains for the same site?
**A:** Yes! Add more domains to:
1. CloudFront `Aliases`
2. ACM certificate `SubjectAlternativeNames`
3. Route 53 records

### Q: What are nameservers and why do I need to update them?
**A:** Nameservers tell the internet where to find your domain's DNS records. You update them to point to AWS Route 53 so your domain works with your website.

---

## Troubleshooting Questions

### Q: My certificate is stuck on "Pending validation". What do I do?
**A:** 
1. Wait 30 minutes (it's slow)
2. Check nameservers are updated at your domain registrar
3. Verify Route 53 has CNAME validation records
4. Make sure you're in `us-east-1` region

### Q: I see "Access Denied" when visiting my site. Help!
**A:** 
1. Wait 5-10 minutes after deployment
2. Check CloudFormation stack is "CREATE_COMPLETE"
3. Verify S3 bucket has files
4. Check CloudFront distribution is "Deployed"

### Q: My changes aren't showing up. Why?
**A:** 
1. Clear CloudFront cache: `aws cloudfront create-invalidation ...`
2. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
3. Wait 2-3 minutes for cache invalidation
4. Check you uploaded to correct bucket

### Q: I get 404 errors when refreshing pages (React Router). How do I fix it?
**A:** Already handled! The CloudFormation template redirects 404s to `index.html`. If still happening:
1. Verify CloudFront error responses are configured
2. Clear CloudFront cache
3. Check your React Router setup

### Q: CloudFormation stack failed to create. What now?
**A:** 
1. Go to CloudFormation → Your stack → Events tab
2. Look for red "FAILED" entries
3. Read the error message
4. Common fixes:
   - Use `us-east-1` region
   - Check domain name format
   - Verify IAM permissions
5. Delete failed stack and try again

---

## Cost & Billing Questions

### Q: Will I get charged if I stay in the free tier?
**A:** You'll pay ~$0.50/month for Route 53 (not free). Everything else is free for 12 months if you stay under limits:
- S3: 5 GB storage, 20K GET requests
- CloudFront: 1 TB transfer, 10M requests

### Q: How do I avoid unexpected charges?
**A:** 
1. Set up billing alerts in AWS Console
2. Monitor usage in Cost Explorer
3. Delete resources when not needed
4. Use CloudFront caching effectively

### Q: What happens after the free tier expires?
**A:** You start paying for usage:
- S3: ~$0.023/GB/month
- CloudFront: ~$0.085/GB transfer
- Route 53: $0.50/month

For a typical small website: $1-5/month total.

### Q: Can I estimate my costs?
**A:** Yes! Use the [AWS Pricing Calculator](https://calculator.aws/). Typical small website:
- 10 GB storage: $0.23/month
- 100 GB transfer: $8.50/month
- Route 53: $0.50/month
- **Total**: ~$9/month

But most small sites use much less.

---

## Security Questions

### Q: Is this secure?
**A:** Yes! Security features included:
- ✅ HTTPS only (free SSL certificate)
- ✅ S3 bucket is private (CloudFront only)
- ✅ DDoS protection (AWS Shield)
- ✅ Security headers
- ✅ Encryption at rest

### Q: Should I use my root AWS account?
**A:** **NO!** Create an IAM user with limited permissions. Never use root account for daily work.

### Q: How do I protect my AWS credentials?
**A:** 
1. Never commit credentials to Git
2. Use environment variables or AWS CLI config
3. Rotate keys every 90 days
4. Enable MFA on AWS account
5. Use IAM roles when possible

### Q: Can someone hack my S3 bucket?
**A:** Very unlikely. The bucket is:
- Not publicly accessible
- Only accessible via CloudFront
- Protected by AWS security
- Encrypted at rest

### Q: Do I need a WAF (Web Application Firewall)?
**A:** Not required for static sites, but you can add AWS WAF for extra protection against:
- SQL injection attempts
- XSS attacks
- Bot traffic
- DDoS attacks

Cost: ~$5-10/month

---

## Performance Questions

### Q: How fast will my website be?
**A:** Very fast! CloudFront delivers from 200+ edge locations worldwide. Typical load times:
- First visit: 200-500ms
- Cached visits: 50-100ms

### Q: Can this handle high traffic?
**A:** Yes! This setup scales automatically:
- 100 users: No problem
- 1,000 users: No problem
- 10,000 users: No problem
- 1,000,000+ users: Still works!

### Q: How do I make my site even faster?
**A:** 
1. Optimize images (WebP format, compression)
2. Use code splitting (Vite does this)
3. Lazy load components
4. Minimize bundle size
5. Use React.lazy() for routes

### Q: What's the cache hit ratio?
**A:** Typically 80-95% for static sites. This means most requests are served from CloudFront cache (fast + cheap).

---

## Comparison Questions

### Q: Why not use Vercel or Netlify?
**A:** Both are great! Pros/cons:

**Vercel/Netlify**:
- ✅ Easier setup (no AWS knowledge needed)
- ✅ Built-in CI/CD
- ❌ More expensive at scale
- ❌ Less control
- ❌ Vendor lock-in

**This AWS Setup**:
- ✅ Cheaper at scale
- ✅ Full control
- ✅ Learn valuable AWS skills
- ✅ No vendor lock-in
- ❌ Slightly more complex setup

### Q: Why not use AWS Amplify?
**A:** Amplify is great for full-stack apps! Differences:

**Amplify**:
- ✅ Easier (one command)
- ✅ Built-in CI/CD
- ✅ Backend features
- ❌ More expensive
- ❌ Less control

**This Setup**:
- ✅ Cheaper
- ✅ More control
- ✅ Learn infrastructure
- ❌ Manual setup

### Q: Why not use shared hosting?
**A:** Traditional hosting is outdated:

**Shared Hosting**:
- ❌ Slower (no CDN)
- ❌ Less reliable
- ❌ Manual scaling
- ❌ Often more expensive
- ✅ Familiar cPanel interface

**This AWS Setup**:
- ✅ Global CDN
- ✅ Auto-scaling
- ✅ 99.9%+ uptime
- ✅ Cheaper
- ❌ Learning curve

---

## Advanced Questions

### Q: Can I use this with a monorepo?
**A:** Yes! Just adjust the build path:
```bash
cd packages/frontend
npm run build
aws s3 sync dist/ s3://bucket
```

### Q: How do I add custom headers?
**A:** Modify CloudFormation template:
```yaml
ResponseHeadersPolicyId: !Ref CustomHeadersPolicy
```

Or use Lambda@Edge for dynamic headers.

### Q: Can I use this for a mobile app backend?
**A:** Not directly. This is for static websites. For mobile backends:
- API Gateway + Lambda
- AWS AppSync (GraphQL)
- AWS Amplify

### Q: How do I add authentication?
**A:** Options:
1. **AWS Cognito**: User pools, social login
2. **Auth0**: Third-party auth service
3. **Firebase Auth**: Google's auth service
4. **Lambda@Edge**: Custom auth logic

### Q: Can I use WebSockets?
**A:** No, this is for static content only. For WebSockets:
- API Gateway WebSocket APIs
- AWS IoT Core
- EC2 with Socket.io

---

## Maintenance Questions

### Q: How often do I need to update things?
**A:** 
- **Website**: Whenever you want
- **CloudFormation**: Rarely (only for infrastructure changes)
- **SSL Certificate**: Auto-renews (no action needed)
- **AWS CLI**: Update occasionally (`brew upgrade awscli`)

### Q: What if AWS changes something?
**A:** AWS maintains backward compatibility. Your setup will keep working. Updates are optional.

### Q: How do I monitor my website?
**A:** 
1. **CloudWatch**: Built-in AWS monitoring (free)
2. **Google Analytics**: User behavior
3. **Uptime monitoring**: UptimeRobot, Pingdom
4. **Error tracking**: Sentry, LogRocket

### Q: Should I back up my website?
**A:** Yes! S3 versioning is enabled, but also:
1. Keep code in Git (GitHub, GitLab)
2. Export CloudFormation template
3. Document your setup
4. Test disaster recovery

---

## Migration Questions

### Q: Can I migrate from my current host?
**A:** Yes! Steps:
1. Deploy AWS infrastructure
2. Upload your website files to S3
3. Test using CloudFront URL
4. Update DNS to point to CloudFront
5. Old host can be cancelled

### Q: How do I migrate from Netlify/Vercel?
**A:** 
1. Export your site (download build files)
2. Deploy to S3
3. Update DNS records
4. Cancel old service

### Q: Will there be downtime during migration?
**A:** Minimal! DNS changes take 10-60 minutes, but you can:
1. Set up everything on AWS first
2. Test thoroughly
3. Update DNS (brief propagation period)
4. Both sites work during transition

---

## Support Questions

### Q: Where can I get help?
**A:** 
1. Read [GUIDE.md](GUIDE.md) - comprehensive troubleshooting
2. AWS Support - free tier includes basic support
3. [AWS Forums](https://forums.aws.amazon.com)
4. [Stack Overflow](https://stackoverflow.com/questions/tagged/aws)
5. AWS documentation

### Q: Does AWS offer free support?
**A:** Yes! Basic support is included:
- Documentation
- Forums
- Service health dashboard
- Trusted Advisor (basic checks)

Paid support starts at $29/month.

### Q: Can I hire someone to set this up?
**A:** You don't need to! The guide is designed for complete beginners. But if you prefer, AWS has:
- AWS Professional Services
- AWS Partner Network (consultants)
- Freelancers on Upwork, Fiverr

---

## Next Steps

### Q: What should I learn next?
**A:** After mastering this setup:
1. **Lambda**: Serverless functions
2. **API Gateway**: Build APIs
3. **DynamoDB**: NoSQL database
4. **Cognito**: User authentication
5. **AWS CDK**: Infrastructure as code (TypeScript/Python)

### Q: How do I add more features?
**A:** Common additions:
- **Contact form**: Lambda + SES
- **Blog**: Add CMS (Contentful, Sanity)
- **E-commerce**: Stripe integration
- **Analytics**: Google Analytics, Plausible
- **Search**: Algolia, AWS CloudSearch

### Q: Can I use this knowledge professionally?
**A:** Absolutely! Skills you'll learn:
- AWS fundamentals
- CloudFormation (Infrastructure as Code)
- CI/CD concepts
- DNS and networking
- Security best practices

These are valuable in the job market!

---

## Still Have Questions?

1. **Check the [GUIDE.md](GUIDE.md)** - Most questions are answered there
2. **Read [ARCHITECTURE.md](ARCHITECTURE.md)** - Deep dive into how it works
3. **Try it!** - Often the best way to learn is by doing

**Remember**: This is a learning opportunity. Don't be afraid to experiment. You can always delete and start over!
