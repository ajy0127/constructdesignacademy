import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

// Initialize SES client with AWS profile
const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, company, budget, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare email content
    const emailSubject = `New Contact Form Submission from ${fullName}`;
    const emailBody = `
New contact form submission:

Name: ${fullName}
Email: ${email}
Company: ${company || 'Not provided'}
Budget: ${budget || 'Not provided'}

Message:
${message}

---
This email was sent from the Construct Design Academy contact form.
    `.trim();

    // Send email via SES
    const command = new SendEmailCommand({
      Source: 'teamconnoisseurww@gmail.com', // Verified sender email
      Destination: {
        ToAddresses: ['teamconnoisseurww@gmail.com'],
      },
      Message: {
        Subject: {
          Data: emailSubject,
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: emailBody,
            Charset: 'UTF-8',
          },
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #C2A376;">New Contact Form Submission</h2>
                  <table style="width: 100%; max-width: 600px; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 10px; font-weight: bold; width: 120px;">Name:</td>
                      <td style="padding: 10px;">${fullName}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 10px; font-weight: bold;">Email:</td>
                      <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 10px; font-weight: bold;">Company:</td>
                      <td style="padding: 10px;">${company || 'Not provided'}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                      <td style="padding: 10px; font-weight: bold;">Budget:</td>
                      <td style="padding: 10px;">${budget || 'Not provided'}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #C2A376;">
                    <h3 style="margin-top: 0; color: #C2A376;">Message:</h3>
                    <p style="white-space: pre-wrap;">${message}</p>
                  </div>
                  <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
                  <p style="font-size: 12px; color: #666;">This email was sent from the Construct Design Academy contact form.</p>
                </body>
              </html>
            `,
            Charset: 'UTF-8',
          },
        },
      },
    });

    await sesClient.send(command);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
