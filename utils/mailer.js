import nodemailer from 'nodemailer';
import { supabase } from '@/utils/supabase';

/**
 * Sends an email notification when a new contact inquiry is submitted.
 * @param {Object} contactData - Object containing name, email, phone, company, message
 */
export async function sendContactEmail(contactData) {
  const { name, email, phone, company, message } = contactData;

  // Try loading dynamic DB settings first
  let dbSmtp = null;
  try {
    const { data } = await supabase
      .from('site_content')
      .select('content')
      .eq('key', 'smtp-settings')
      .maybeSingle();
    if (data?.content) dbSmtp = data.content;
  } catch (err) {
    console.warn('Could not fetch DB SMTP settings, using env defaults:', err?.message);
  }

  const smtpHost = dbSmtp?.host || process.env.SMTP_HOST || 'smtp.hostinger.com';
  const smtpPort = parseInt(dbSmtp?.port || process.env.SMTP_PORT || '465', 10);
  const smtpUser = dbSmtp?.user || process.env.SMTP_USER;
  const smtpPass = dbSmtp?.pass || process.env.SMTP_PASS;
  const receiverEmail = dbSmtp?.notificationEmail || process.env.NOTIFICATION_EMAIL || smtpUser || 'info@aetherrfid.com';

  if (!smtpUser || !smtpPass) {
    console.warn('⚠️ SMTP_USER or SMTP_PASS missing in DB & .env.local. Email notification skipped.');
    return { success: false, error: 'SMTP credentials missing. Please configure SMTP settings in Admin Dashboard or .env.local' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for port 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
        .header { background: #0f172a; color: #ffffff; padding: 25px; text-align: center; }
        .header h2 { margin: 0; font-size: 22px; font-weight: 700; color: #d76539; }
        .content { padding: 30px; color: #334155; }
        .field { margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
        .field-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
        .field-value { font-size: 16px; color: #0f172a; font-weight: 500; }
        .message-box { background: #f8fafc; border-left: 4px solid #d76539; padding: 15px; border-radius: 6px; font-size: 15px; color: #334155; line-height: 1.6; }
        .footer { background: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Inquiry - Aether RFID</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${name || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email || 'N/A'}</a></div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${phone || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${company || 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${(message || '').replace(/\n/g, '<br/>')}</div>
          </div>
        </div>
        <div class="footer">
          This message was sent automatically from your website contact form.
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Aether RFID Website" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email,
      subject: `📩 New Contact Inquiry from ${name || 'Website Visitor'}`,
      html: htmlTemplate,
    });

    console.log('✅ Contact notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send contact notification email:', error);
    return { success: false, error: error.message };
  }
}
