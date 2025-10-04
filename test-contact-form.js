#!/usr/bin/env node

/**
 * Test script for the contact form API
 * This sends a test submission to verify SES email integration
 */

const testData = {
  fullName: "Test User",
  email: "test@example.com",
  company: "Test Company Inc.",
  budget: "50-100k",
  message: "This is a test submission from the contact form to verify AWS SES integration is working correctly."
};

async function testContactForm() {
  console.log('🧪 Testing Contact Form API...\n');
  console.log('📝 Test Data:');
  console.log(JSON.stringify(testData, null, 2));
  console.log('\n📤 Sending request to http://localhost:3000/api/contact...\n');

  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log('📊 Response Status:', response.status);
    console.log('📋 Response Body:');
    console.log(JSON.stringify(result, null, 2));
    console.log('');

    if (response.ok) {
      console.log('✅ SUCCESS! Email sent successfully.');
      console.log('📧 Check teamconnoisseurww@gmail.com for the test email.');
    } else {
      console.log('❌ FAILED! Error sending email.');
      console.log('💡 Check the server logs for more details.');
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.log('\n💡 Make sure the development server is running:');
    console.log('   npm run dev');
  }
}

testContactForm();
