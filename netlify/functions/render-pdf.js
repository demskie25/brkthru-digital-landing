const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium-min');

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    try {
        const { scores, participant, url } = JSON.parse(event.body);
        
        // Construct the rendering URL with base64 data to pass internal state to Puppeteer
        const dataStr = JSON.stringify({ scores, participant });
        const dataParam = Buffer.from(dataStr).toString('base64');
        const renderUrl = `${url}?results=${dataParam}`;

        console.log("Generating PDF for:", participant.firstName, participant.familyName);
        console.log("Render URL:", renderUrl);

        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        
        // Wait for networkidle0 as requested to ensure Enneagram charts are drawn
        await page.goto(renderUrl, { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });

        // Additional wait just in case of animations
        await new Promise(r => setTimeout(r, 1000));

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { 
                top: '1in', 
                bottom: '1in', 
                left: '1in', 
                right: '1in' 
            }
        });

        await browser.close();

        return {
            statusCode: 200,
            headers: {
                ...headers,
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="Enneagram_Report_${participant.firstName}.pdf"`
            },
            body: pdf.toString('base64'),
            isBase64Encoded: true
        };
    } catch (error) {
        console.error('PDF Generation Error:', error);
        return { 
            statusCode: 500, 
            headers,
            body: JSON.stringify({ 
                error: 'Failed to generate PDF', 
                message: error.message 
            }) 
        };
    }
};
