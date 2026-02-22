const https = require('https');

const url = 'https://script.google.com/macros/s/AKfycbxyWY3MHZSKq7jQBqYS6duo2zageOFGendaJbzYEDZn1fs4wCeFy91gt5af0aqqpEq-3A/exec';

const data = {
    firstName: 'Test',
    familyName: 'User',
    email: 'brkthru.consulting@gmail.com',
    position: 'Tester',
    company: 'Brkthru Digital',
    scores: JSON.stringify({ '1': 5, '2': 3, '3': 8 }), // Match the injection logic
    timestamp: new Date().toISOString(),
    notification_type: 'enneagram_report_v26',
    project: 'Brkthru Digital V121'
};

const payload = new URLSearchParams(data).toString();
console.log("Payload length:", payload.length);

function performRequest(targetUrl) {
    console.log("Performing request to:", targetUrl);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    const req = https.request(targetUrl, options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log("Following redirect to:", res.headers.location);
            performRequest(res.headers.location);
            return;
        }

        let body = '';
        res.on('data', (d) => { body += d; });
        res.on('end', () => {
            console.log("Response Body:", body);
        });
    });

    req.on('error', (e) => {
        console.error("Request Error:", e);
    });

    req.write(payload);
    req.end();
}

performRequest(url);
