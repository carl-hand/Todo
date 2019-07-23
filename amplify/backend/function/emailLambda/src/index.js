const AWS = require('aws-sdk');

const ses = new AWS.SES();

exports.handler = async (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  try {
    const emailParams = createInquiryParamsConfig(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return generateResponse(200, data);
  } catch (err) {
    console.log(`error sending feedback: ${err.message}`);
    return generateError(500, err);
  }
};

function createInquiryParamsConfig(body) {
  const { email, message } = JSON.parse(body);
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
      Subject: {
        Data: 'Feedback for todo app',
        Charset: 'UTF-8',
      },
    },
    Source: email,
  };

  return params;
}

function generateResponse(code, payload) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(payload),
  };
}

function generateError(code, err) {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'x-requested-with',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(`error sending feedback: ${err.message}`),
  };
}
