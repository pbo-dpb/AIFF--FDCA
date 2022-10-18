const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: "us-east-1" });
const https = require('https');

const prepareEmailBody = function (payload) {



}

/**
 *  Validate client captcha; uses Cloudflare's Telescope.
 */
const validateCaptcha = async function (token, clientIp) {

    let secretKey = process.env.TELESCOPE_SECRET_KEY;

    let postData = new URLSearchParams();
    postData.append('secret', secretKey);
    postData.append('response', token);
    postData.append('remoteip', clientIp);


    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.toString().length
        },
        timeout: 1000
    };


    return new Promise((resolve, reject) => {
        const req = https.request('https://challenges.cloudflare.com/turnstile/v0/siteverify', options, (res) => {
            if (res.statusCode < 200 || res.statusCode > 299) {
                return reject(new Error(`HTTP status code ${res.statusCode}`))
            }

            const body = []
            res.on('data', (chunk) => body.push(chunk))
            res.on('end', () => {
                const resString = Buffer.concat(body).toString()
                resolve(JSON.parse(resString))
            })
        })

        req.on('error', (err) => {
            reject(err)
        })

        req.on('timeout', () => {
            req.destroy()
            reject(new Error('Request time out'))
        })

        req.write(postData.toString())
        req.end()
    })


}


exports.handler = async (event) => {

    const body = JSON.parse(event.body);

    let captchaResult = await validateCaptcha(body?.captcha.token, event['requestContext']['http']['sourceIp']);

    if (!captchaResult?.success) {
        return {
            statusCode: 422,
            headers: { "content-type": "application/json" },
            body:
                JSON.stringify(captchaResult['error-codes'])
            ,
        };
    }


    /*
    const emailParams = {
    Destination: {
      ToAddresses: ["remy.vanherweghem@parl.gc.ca"],
    },
    Message: {
      Body: {
        Text: { Data: "Test" },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "SourceEmailAddress",
  };
    //ses.sendEmail(emailParams).promise()
    */



    /*
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(
           event
        ),
    };
    return response;*/
};