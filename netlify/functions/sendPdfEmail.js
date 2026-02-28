const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS, POST'
    };

    // Handle CORS preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only accept POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        // 1. ASYNC HANDSHAKE: Initialize transport in parallel with payload parsing to save MS
        const transportPromise = Promise.resolve(nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        }));

        const rawBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
        const data = JSON.parse(rawBody);
        const { participant_name, to_email, company, position, summary } = data;

        if (!participant_name || !to_email || !summary) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Debug log to ensure Netlify injected the variables
        console.log("Initializing SMTP Transport for:", process.env.SMTP_USER ? "User exists" : "User UNDEFINED");

        // Wait for async handshake to finish resolving
        const transporter = await transportPromise;

        const ownerEmail = process.env.SMTP_USER || 'brkthru.consulting@gmail.com';

        // 1. Email to the Owner (Brkthru Team)
        const ownerMailOptions = {
            from: `"Brkthru Assessment System" <${process.env.SMTP_USER}>`,
            to: ownerEmail,
            subject: `New Assessment Result - ${participant_name}`,
            text: `Participant: ${participant_name}\nEmail: ${to_email}\nCompany: ${company || 'N/A'}\nPosition: ${position || 'N/A'}\n\nAssessment completed successfully.\n\nSummary Report:\n${summary}`
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
                    
                    <p style="font-size: 16px;">Thank you for taking the BRKTHRU Leadership Assessment. Your results have been processed securely and your <strong>Summary Report</strong> has been dynamically generated.</p>
                    
                    <div style="background-color: #f8f9fa; border-left: 4px solid #000080; padding: 15px; margin: 20px 0;">
                        <h3 style="margin-top: 0; color: #000080;">Your Summary Report:</h3>
                        <pre style="font-family: inherit; font-size: 15px; white-space: pre-wrap;">${summary}</pre>
                    </div>

                    <p style="font-size: 16px; font-weight: bold; color: #d9534f;">To download your full 15-page visual report, please use the Print/Save button on your results page.</p>
                    
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="margin: 0; font-size: 14px; font-weight: bold; color: #000080;">Warmly,</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #666;">The BRKTHRU Team</p>
                        <a href="https://www.brkthrucoaching.com" style="color: #008080; text-decoration: none; font-size: 14px; font-weight: bold;">www.brkthrucoaching.com</a>
                    </div>
                </div>
            `
        };

        // Dispatch both emails in parallel
        await Promise.all([
            transporter.sendMail(ownerMailOptions),
            transporter.sendMail(participantMailOptions)
        ]);

        // 4. MEMORY MANAGEMENT
        data.summary = null;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Emails sent successfully!' })
        };

    } catch (error) {
        console.error('Serverless Function Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to send email. Check Netlify logs.',
                message: error.message,
                stack: error.stack
            })
        };
    }
};
