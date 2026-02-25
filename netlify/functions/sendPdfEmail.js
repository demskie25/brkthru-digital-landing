const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only accept POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const rawBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
        const data = JSON.parse(rawBody);
        const { participant_name, to_email, company, position, attachment } = data;

        if (!participant_name || !to_email || !attachment) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Debug log to ensure Netlify injected the variables (this will show in Netlify Function Logs, but not the browser)
        console.log("Initializing SMTP Transport for:", process.env.SMTP_USER ? "User exists" : "User UNDEFINED");

        // Configure Nodemailer Transport natively for Gmail
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const ownerEmail = process.env.SMTP_USER || 'brkthru.consulting@gmail.com';

        // 1. Email to the Owner (Brkthru Team)
        const ownerMailOptions = {
            from: `"Brkthru Assessment System" <${process.env.SMTP_USER}>`,
            to: ownerEmail,
            subject: `New Assessment Result - ${participant_name}`,
            text: `Participant: ${participant_name}\nEmail: ${to_email}\nCompany: ${company || 'N/A'}\nPosition: ${position || 'N/A'}\n\nAssessment completed successfully.\nEnclosure: Full Assessment PDF attached.`,
            attachments: [
                {
                    filename: `Enneagram_Report_${participant_name.replace(/\s+/g, '_')}.pdf`,
                    content: attachment,
                    encoding: 'base64'
                }
            ]
        };

        // 2. Email to the Participant (Beautiful HTML Template)
        const participantMailOptions = {
            from: `"BRKTHRU Coaching" <${process.env.SMTP_USER}>`,
            to: to_email,
            subject: `Your Enneagram Leadership Assessment Report`,
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; line-height: 1.6;">
                    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #FFD700; padding-bottom: 20px;">
                        <h1 style="color: #000080; margin: 0; font-size: 24px; letter-spacing: 1px;">BRKTHRU <span style="color: #FFD700;">DIGITAL</span></h1>
                    </div>
                    
                    <p style="font-size: 16px;">Hi ${participant_name},</p>
                    
                    <p style="font-size: 16px;">Thank you for taking the BRKTHRU Leadership Assessment. Your results have been processed securely and your <strong>Full Leadership Intelligence Report</strong> has been dynamically generated.</p>
                    
                    <p style="font-size: 16px;">Please find your comprehensive Enneagram PDF report attached to this email.</p>
                    
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #000080;">Warmly,</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">The BRKTHRU Team</p>
                        <a href="https://www.brkthrucoaching.com" style="color: #008080; text-decoration: none; font-size: 14px; font-weight: bold;">www.brkthrucoaching.com</a>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: `Enneagram_Report.pdf`,
                    content: attachment,
                    encoding: 'base64'
                }
            ]
        };

        // Dispatch both emails in parallel
        await Promise.all([
            transporter.sendMail(ownerMailOptions),
            transporter.sendMail(participantMailOptions)
        ]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Emails sent successfully!' })
        };

    } catch (error) {
        console.error('Serverless Function Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to send email. Check Netlify logs.',
                message: error.message,
                stack: error.stack
            })
        };
    }
};
