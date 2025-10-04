# Contact Form Setup with AWS SES

## Overview
The contact form sends emails via AWS Simple Email Service (SES) to `teamconnoisseurww@gmail.com`.

## Prerequisites
- AWS account with SES configured (profile: `con`)
- Verified email identity: `teamconnoisseurww@gmail.com` in AWS SES
- AWS credentials with SES send permissions

## Setup Instructions

### 1. Get AWS Credentials
You need to get your AWS credentials from your AWS account (profile: `con`):

```bash
# If using AWS CLI with named profiles, you can view your credentials:
cat ~/.aws/credentials
```

Look for the `[con]` profile section.

### 2. Create Environment Variables File
Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

### 3. Add Your AWS Credentials
Edit `.env.local` and add your actual AWS credentials:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_actual_access_key_id
AWS_SECRET_ACCESS_KEY=your_actual_secret_access_key
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 4. Verify SES Configuration
Ensure in your AWS SES console:
- ✅ `teamconnoisseurww@gmail.com` is verified
- ✅ Your account is out of sandbox mode (or both sender and recipient are verified)
- ✅ Your IAM user/role has `ses:SendEmail` permission

### 5. Test the Form
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/contact`

3. Fill out and submit the form

4. Check `teamconnoisseurww@gmail.com` for the email

## API Endpoint
- **URL:** `/api/contact`
- **Method:** `POST`
- **Content-Type:** `application/json`

### Request Body
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "budget": "50-100k",
  "message": "I'd like to discuss a project..."
}
```

### Response
**Success (200):**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error (400/500):**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Troubleshooting

### Email Not Sending
1. **Check AWS credentials:** Ensure they're correct in `.env.local`
2. **Verify SES identity:** Confirm `teamconnoisseurww@gmail.com` is verified in SES
3. **Check SES sandbox:** If in sandbox mode, both sender and recipient must be verified
4. **Review IAM permissions:** Ensure the IAM user has `ses:SendEmail` permission
5. **Check region:** Verify the AWS region matches where your SES is configured

### Check Logs
Development logs will show in the terminal. Look for:
```
Error sending email: [error details]
```

### Test SES Directly
You can test SES using AWS CLI:
```bash
aws ses send-email \
  --from teamconnoisseurww@gmail.com \
  --destination ToAddresses=teamconnoisseurww@gmail.com \
  --message "Subject={Data='Test'},Body={Text={Data='Test message'}}" \
  --profile con
```

## Production Deployment

For production, set environment variables in your hosting platform:
- **Vercel:** Project Settings → Environment Variables
- **AWS Amplify:** App Settings → Environment Variables
- **Netlify:** Site Settings → Environment Variables

Add the same variables:
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

## Security Notes
- ✅ Environment variables are not exposed to the client
- ✅ API route runs server-side only
- ✅ `.env.local` is gitignored
- ⚠️ Consider using AWS IAM roles instead of access keys in production
- ⚠️ Implement rate limiting to prevent abuse
