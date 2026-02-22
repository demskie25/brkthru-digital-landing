const https = require('https');

const url = 'https://script.google.com/macros/s/AKfycbxyWY3MHZSKq7jQBqYS6duo2zageOFGendaJbzYEDZn1fs4wCeFy91gt5af0aqqpEq-3A/exec';

const data = {
    firstName: 'Test',
    familyName: 'User',
    email: 'brkthru.consulting@gmail.com', // Test email
    scores: JSON.stringify({ '1': 5, '2': 3, '3': 8 })
};

const payload = new URLSearchParams(data).toString();

function performRequest(targetUrl) {
    console.log("Testing minimal payload to:", targetUrl);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    };

    const req = https.request(targetUrl, options, (res) => {
        console.log(`Status: ${res.statusCode}`);
        if (res.headers.location) {
            console.log("Redirect:", res.headers.location);
            // Don't follow redirect for minimal test, just want to see if we get 302
        }
    });

    req.on('error', (e) => {
        console.error("Error:", e);
    });

    req.write(payload);
    req.end();
}

performRequest(url);
