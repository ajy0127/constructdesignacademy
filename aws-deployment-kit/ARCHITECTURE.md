# Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet Users                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ DNS Query: yourdomain.com
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Route 53 (DNS Service)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Hosted Zone: yourdomain.com                             │   │
│  │  - A Record: yourdomain.com → CloudFront                 │   │
│  │  - A Record: www.yourdomain.com → CloudFront             │   │
│  │  - CNAME Records: Certificate validation                 │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Returns: CloudFront domain
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              AWS Certificate Manager (ACM)                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  SSL/TLS Certificate                                     │   │
│  │  - Domain: yourdomain.com                                │   │
│  │  - SAN: www.yourdomain.com                               │   │
│  │  - Validation: DNS (automatic)                           │   │
│  │  - Cost: FREE                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                         │
                         │ HTTPS Certificate
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                CloudFront (CDN Distribution)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Global Edge Locations (200+ worldwide)                  │   │
│  │  - Caching: Optimized for static content                 │   │
│  │  - Compression: Gzip + Brotli                            │   │
│  │  - Protocol: HTTP/2, HTTP/3                              │   │
│  │  - Security: TLS 1.2+, Security headers                  │   │
│  │  - Error handling: SPA routing (404 → index.html)        │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Origin Access Control (OAC)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    S3 Bucket (Origin)                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Static Website Files                                    │   │
│  │  - index.html                                            │   │
│  │  - assets/                                               │   │
│  │    - js/main-[hash].js                                   │   │
│  │    - css/main-[hash].css                                 │   │
│  │    - images/                                             │   │
│  │  - favicon.ico                                           │   │
│  │                                                           │   │
│  │  Features:                                               │   │
│  │  - Versioning: Enabled (for rollbacks)                   │   │
│  │  - Encryption: AES-256                                   │   │
│  │  - Public Access: Blocked (CloudFront only)              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Route 53 (DNS)

**Purpose**: Translates your domain name to CloudFront's address

**Resources Created**:
- Hosted Zone for your domain
- A Records (Alias) pointing to CloudFront
- CNAME records for certificate validation

**Why We Use It**:
- Professional DNS management
- Low latency DNS queries
- Automatic health checks
- Integration with other AWS services

**Cost**: $0.50/month per hosted zone + $0.40 per million queries

---

### 2. AWS Certificate Manager (ACM)

**Purpose**: Provides free SSL/TLS certificates for HTTPS

**Features**:
- Automatic certificate renewal
- DNS validation (automatic with Route 53)
- Wildcard support (*.yourdomain.com)
- No cost ever

**Why We Use It**:
- HTTPS is required for modern web
- Free (vs $50-200/year elsewhere)
- Automatic renewal (no manual work)
- Trusted by all browsers

**Cost**: FREE

---

### 3. CloudFront (CDN)

**Purpose**: Global content delivery network for fast, secure access

**Key Features**:

#### Caching
- Edge locations cache your content globally
- Reduces load on S3
- Faster response times worldwide
- Customizable cache policies

#### Security
- DDoS protection (AWS Shield Standard)
- Origin Access Control (OAC) - only CloudFront can access S3
- HTTPS enforcement
- Security headers (XSS protection, etc.)

#### Performance
- HTTP/2 and HTTP/3 support
- Gzip and Brotli compression
- Connection reuse
- TCP optimization

#### SPA Support
- Custom error responses (404 → index.html)
- Enables React Router and other client-side routing

**Cost**: 
- Free tier: 1 TB transfer, 10M requests (first 12 months)
- After: ~$0.085/GB, $0.01 per 10K requests

---

### 4. S3 (Storage)

**Purpose**: Stores your static website files

**Configuration**:
- **Static website hosting**: Enabled
- **Versioning**: Enabled (rollback capability)
- **Encryption**: Server-side (AES-256)
- **Public access**: Blocked (CloudFront only)
- **Bucket policy**: Allows CloudFront OAC

**File Structure**:
```
s3://your-bucket/
├── index.html
├── favicon.ico
├── assets/
│   ├── index-abc123.js
│   ├── index-def456.css
│   └── logo-xyz789.png
└── robots.txt
```

**Why We Use It**:
- Extremely reliable (99.999999999% durability)
- Scales automatically
- Very cheap storage
- Versioning for rollbacks

**Cost**: 
- Free tier: 5 GB storage, 20K GET requests
- After: $0.023/GB/month

---

## Data Flow

### Initial Page Load

1. **User enters URL**: `https://yourdomain.com`
2. **DNS Resolution**: 
   - Browser queries Route 53
   - Route 53 returns CloudFront domain
3. **TLS Handshake**:
   - Browser connects to nearest CloudFront edge
   - CloudFront presents ACM certificate
   - Secure connection established
4. **Cache Check**:
   - CloudFront checks if content is cached
   - If cached: Return immediately (fast!)
   - If not cached: Proceed to origin
5. **Origin Request**:
   - CloudFront requests file from S3
   - Uses Origin Access Control for authentication
   - S3 returns file
6. **Cache & Deliver**:
   - CloudFront caches the file at edge location
   - Returns file to user
   - Subsequent requests served from cache

### Subsequent Requests

1. User requests asset (JS, CSS, image)
2. CloudFront serves from edge cache (ultra-fast)
3. No S3 request needed (saves cost)

### Deployment Flow

1. **Developer**: Runs `npm run build`
2. **Build**: Creates optimized files in `dist/`
3. **Upload**: `aws s3 sync dist/ s3://bucket`
4. **Invalidation**: `aws cloudfront create-invalidation`
5. **Cache Clear**: CloudFront removes old cached files
6. **Live**: New version available globally in 1-2 minutes

---

## Security Architecture

### Defense in Depth

```
┌─────────────────────────────────────────┐
│  Layer 1: CloudFront                    │
│  - DDoS protection (AWS Shield)         │
│  - WAF (optional, can add)              │
│  - HTTPS only                           │
│  - Security headers                     │
└────────────┬────────────────────────────┘
             │
             │ Origin Access Control (OAC)
             ▼
┌─────────────────────────────────────────┐
│  Layer 2: S3 Bucket                     │
│  - Public access blocked                │
│  - Bucket policy (CloudFront only)      │
│  - Encryption at rest                   │
│  - Versioning (rollback attacks)        │
└─────────────────────────────────────────┘
```

### Security Features

1. **Origin Access Control (OAC)**
   - Replaces older Origin Access Identity (OAI)
   - S3 bucket is completely private
   - Only CloudFront can access files
   - Uses AWS Signature Version 4

2. **HTTPS Everywhere**
   - HTTP automatically redirects to HTTPS
   - TLS 1.2+ minimum
   - Modern cipher suites only

3. **Security Headers**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block
   - Referrer-Policy: strict-origin-when-cross-origin

4. **S3 Bucket Hardening**
   - Block all public access
   - Encryption at rest (AES-256)
   - Versioning enabled
   - Access logging (optional)

---

## Scalability

### Automatic Scaling

**CloudFront**:
- Handles millions of requests automatically
- No configuration needed
- Scales to any traffic level
- Global distribution

**S3**:
- Unlimited storage
- Unlimited requests
- Automatic partitioning
- No capacity planning needed

### Performance Under Load

| Concurrent Users | Response Time | Cost Impact |
|-----------------|---------------|-------------|
| 100 | <100ms | Minimal |
| 1,000 | <100ms | ~$1-5 |
| 10,000 | <100ms | ~$10-20 |
| 100,000 | <100ms | ~$50-100 |
| 1,000,000+ | <100ms | ~$500+ |

*Assumes 90% cache hit rate, typical website*

---

## High Availability

### Redundancy

- **Route 53**: Anycast network, multiple DNS servers
- **CloudFront**: 200+ edge locations, automatic failover
- **S3**: Data replicated across multiple facilities
- **ACM**: Certificates distributed globally

### SLA (Service Level Agreement)

- **Route 53**: 100% uptime SLA
- **CloudFront**: 99.9% uptime SLA
- **S3**: 99.9% uptime SLA

**Effective uptime**: 99.9%+ (industry-leading)

---

## Cost Optimization

### Included Optimizations

1. **CloudFront Caching**
   - Reduces S3 requests (saves money)
   - Faster for users (better experience)

2. **Price Class**
   - Template uses `PriceClass_100` (cheapest)
   - Covers North America and Europe
   - Can upgrade to global if needed

3. **S3 Lifecycle Policies** (optional)
   - Archive old versions to Glacier
   - Delete old versions after X days

4. **Compression**
   - Gzip/Brotli reduces bandwidth
   - Smaller files = lower transfer costs

### Cost Monitoring

Set up billing alerts:
1. Go to AWS Billing Console
2. Create budget alert
3. Set threshold (e.g., $10/month)
4. Get email when exceeded

---

## Disaster Recovery

### Backup Strategy

1. **S3 Versioning**: Enabled
   - Keep previous versions of files
   - Rollback to any previous version
   - Protect against accidental deletion

2. **CloudFormation Stack**: Infrastructure as Code
   - Entire infrastructure in one template
   - Can recreate everything in minutes
   - Version control in Git

3. **Deployment Scripts**: Automated
   - Repeatable deployments
   - No manual steps
   - Documented process

### Recovery Procedures

**Scenario 1: Bad Deployment**
```bash
# Rollback to previous S3 version
aws s3api list-object-versions --bucket your-bucket
aws s3api copy-object --copy-source "bucket/file?versionId=xyz"

# Or re-deploy previous build
git checkout previous-commit
npm run build
./deploy.sh
```

**Scenario 2: Accidental Deletion**
```bash
# Restore from S3 version history
aws s3api list-object-versions --bucket your-bucket
aws s3api copy-object --copy-source "bucket/file?versionId=xyz"
```

**Scenario 3: Complete Infrastructure Loss**
```bash
# Redeploy CloudFormation stack
aws cloudformation create-stack \
  --stack-name my-website \
  --template-body file://website-infrastructure.yaml \
  --parameters file://parameters.json

# Wait for completion, then redeploy website
npm run build
./deploy.sh
```

---

## Monitoring & Observability

### CloudWatch Metrics (Free)

**CloudFront**:
- Requests
- Bytes downloaded
- Error rate (4xx, 5xx)
- Cache hit ratio

**S3**:
- Number of objects
- Bucket size
- Request count

### Optional Enhancements

1. **CloudFront Access Logs**
   - Detailed request logs
   - Stored in S3
   - Analyze with Athena

2. **S3 Access Logs**
   - Track all S3 access
   - Security auditing

3. **CloudWatch Alarms**
   - Alert on high error rates
   - Alert on unusual traffic
   - SNS notifications

4. **AWS CloudTrail**
   - API call logging
   - Security auditing
   - Compliance

---

## Comparison with Alternatives

### vs. Traditional Hosting

| Feature | AWS (This Setup) | Traditional Host |
|---------|------------------|------------------|
| Scalability | Automatic, unlimited | Manual, limited |
| Global CDN | Included | Extra cost |
| HTTPS | Free, automatic | $50-200/year |
| Uptime | 99.9%+ | 99.5% typical |
| Cost | $1-5/month | $5-50/month |
| Setup | 30-60 min | Hours/days |

### vs. Other AWS Solutions

| Feature | S3 + CloudFront | Amplify | EC2 |
|---------|-----------------|---------|-----|
| Cost | $ | $$ | $$$ |
| Complexity | Low | Very Low | High |
| Flexibility | Medium | Low | High |
| SSR Support | No | Yes | Yes |
| Best For | Static sites | Full-stack | Custom needs |

---

## Future Enhancements

### Easy Additions

1. **AWS WAF**: Web application firewall
2. **Lambda@Edge**: Custom logic at edge
3. **CloudWatch Dashboards**: Visual monitoring
4. **S3 Transfer Acceleration**: Faster uploads
5. **Multiple Environments**: Dev, staging, prod

### Advanced Features

1. **Blue-Green Deployments**: Zero-downtime updates
2. **A/B Testing**: Lambda@Edge for traffic splitting
3. **Real-time Logs**: Kinesis Data Streams
4. **Image Optimization**: Lambda for on-the-fly resizing
5. **API Integration**: API Gateway + Lambda backend

---

## Best Practices Summary

✅ **DO**:
- Use `us-east-1` for CloudFormation (certificate requirement)
- Enable S3 versioning (rollback capability)
- Set up billing alerts
- Use IAM users, not root account
- Keep CloudFormation template in Git
- Test deployments in staging first

❌ **DON'T**:
- Hardcode credentials in code
- Make S3 bucket public
- Skip certificate validation
- Forget to invalidate CloudFront cache
- Delete S3 bucket before stack
- Use root AWS account

---

This architecture is production-ready and used by companies of all sizes. It's reliable, scalable, secure, and cost-effective.
