const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { amount, currency, description, name, email, phone } = JSON.parse(
    event.body,
  );

  if (!process.env.HITPAY_API_KEY) {
    return { statusCode: 500, body: "Missing API Key" };
  }

  try {
    const response = await fetch(
      "https://api.hit-pay.com/v1/payment-requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-Business-Api-Key": process.env.HITPAY_API_KEY,
        },
        body: JSON.stringify({
          amount: amount,
          currency: currency,
          purpose: description,
          name: name,
          email: email,
          phone: phone,
          redirect_url: "https://brkthru-digital.netlify.app/success.html",
          webhook: "https://connect.pabbly.com/wo/o/YOUR_WEBHOOK_ID", // Double capturing state via HitPay webhook if needed
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ url: data.url }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify(data),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to HitPay" }),
    };
  }
};
