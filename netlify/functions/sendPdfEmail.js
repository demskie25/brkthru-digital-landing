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

        // 2. Email to the Participant
        const participantMailOptions = {
            from: `"BRKTHRU Coaching" <${process.env.SMTP_USER}>`,
            to: to_email,
            subject: `Your Enneagram Leadership Assessment Report`,
            text: `Hi ${participant_name},\n\nThank you for taking the BRKTHRU Leadership Assessment. Your results have been processed securely and your Full Leadership Intelligence Report has been dynamically generated.\n\nPlease find your report attached to this email.\n\nWarmly,\nThe BRKTHRU Team\nwww.brkthrucoaching.com`,
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
