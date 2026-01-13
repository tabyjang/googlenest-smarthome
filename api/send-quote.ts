// API endpoint for sending quote emails
// In production, this would be deployed as a serverless function (Vercel, Netlify, etc.)

import { Resend } from 'resend';
import { QuotePayload, EmailResponse } from '../types';

const resend = new Resend(process.env.RESEND_API_KEY);

function buildQuoteEmailHTML(payload: QuotePayload): string {
  const { customer, rooms, options, totalPrice, breakdown } = payload;

  const breakdownRows = breakdown
    .map(item => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${item.item}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">₩${item.price.toLocaleString()}</td>
      </tr>
    `)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f9fafb; margin: 0; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #4285F4 0%, #1a73e8 100%); padding: 40px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Google Nest 스마트홈 견적서</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          <!-- Customer Info -->
          <div style="margin-bottom: 32px;">
            <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 16px;">고객 정보</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">이름</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${customer.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">이메일</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${customer.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">연락처</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${customer.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;">설치 주소</td>
                <td style="padding: 8px 0; color: #1f2937; font-weight: 500;">${customer.address}</td>
              </tr>
            </table>
          </div>

          <!-- Quote Breakdown -->
          <div style="margin-bottom: 32px;">
            <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 16px;">견적 상세</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${breakdownRows}
            </table>
          </div>

          <!-- Total -->
          <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; text-align: center;">
            <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 14px;">총 예상 금액</p>
            <p style="color: #1f2937; margin: 0; font-size: 32px; font-weight: 700;">₩${totalPrice.toLocaleString()}</p>
          </div>

          <!-- Note -->
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px; text-align: center;">
            * 위 금액은 예상 견적이며, 실제 설치 환경에 따라 변동될 수 있습니다.<br>
            * 전문 상담사가 빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>

        <!-- Footer -->
        <div style="background: #1f2937; padding: 24px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            © 2025 Google Nest Experience. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const payload: QuotePayload = await request.json();

    // Validate required fields
    if (!payload.customer?.email || !payload.customer?.name) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailHtml = buildQuoteEmailHTML(payload);

    // Send email to customer
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@example.com',
      to: payload.customer.email,
      subject: `[Google Nest] 스마트홈 견적서 - ₩${payload.totalPrice.toLocaleString()}`,
      html: emailHtml
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Also send notification to business
    if (process.env.EMAIL_TO) {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@example.com',
        to: process.env.EMAIL_TO,
        subject: `[새 견적 문의] ${payload.customer.name} - ₩${payload.totalPrice.toLocaleString()}`,
        html: emailHtml
      });
    }

    const response: EmailResponse = {
      success: true,
      message: 'Quote sent successfully',
      id: data?.id
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
