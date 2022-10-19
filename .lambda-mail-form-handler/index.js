const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: "us-east-1", apiVersion: '2010-12-01' });
const https = require('https');
const fs = require('fs');
const { randomUUID } = require('crypto');


const sendInternalEmail = async function (strings, emailBody) {

    const emailParams = {
        Destination: {
            ToAddresses: process.env.INTERNAL_EMAIL_RECIPIENTS.split(','),
        },
        Message: {
            Body: {
                Text: { Data: emailBody, Charset: "UTF-8", },
            },
            Subject: { Data: strings.emails.internal.subject, Charset: "UTF-8", },
        },
        Source: process.env.EMAIL_FROM,
        ReplyToAddresses: process.env.EMAIL_REPLY_TO.split(','),
    };


    const sendPromise = await ses.sendEmail(emailParams).promise();


}

const prepareEmailBody = function (strings, payload) {

    let parts = [
        `# ${strings.request_types.options[payload.request_type]}`,
        "---",
        payload.main

    ];

    if (payload.contact) {
        parts = [
            ...parts,
            "---",
            payload.contact.name,
            "---",
            `${strings.contact_form.preferred_method.legend}: ${strings.contact_form.preferred_method.options[payload.contact.preferred_method]}`,
            payload.contact.email ? payload.contact.email : null,
            payload.contact.phone ? payload.contact.phone : null,
            payload.contact.postal ? payload.contact.postal : null,
        ];
    }

    parts = [
        ...parts,
        "---",
        payload.id
    ];

    return parts.filter(n => n).join("\n");

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


const isRequestInvalid = function (body, strings) {

    if (!body?.captcha.token || !body?.request_type || !body?.main)
        return true;

    if (body.contact && (!body.contact.name || !body.contact.preferred_method))
        return true;


    if (!Object.keys(strings.request_types.options).includes(body.request_type))
        return true;

    if (body.contact && !Object.keys(strings.contact_form.preferred_method.options).includes(body.contact.preferred_method))
        return true;

    return false;

}

exports.handler = async (event) => {

    const body = JSON.parse(event.body);

    const strings = JSON.parse(fs.readFileSync(`strings.${body?.language ?? 'en'}.json`));

    if (isRequestInvalid(body, strings)) {
        return {
            statusCode: 422,
            headers: { "content-type": "application/json" },
            body:
                "Form data didn't pass basic validation."
            ,
        };
    }


    let captchaResult = await validateCaptcha(body.captcha.token, event['requestContext']['http']['sourceIp']);

    if (!captchaResult?.success) {
        return {
            statusCode: 422,
            headers: { "content-type": "application/json" },
            body:
                JSON.stringify(captchaResult['error-codes'])
            ,
        };
    }

    body.id = body.id ? body.id : randomUUID();



    const emailBody = prepareEmailBody(strings, body);


    try {
        await sendInternalEmail(strings, emailBody);
    } catch (e) {
        console.log(emailBody);
        console.error(e);
        return {
            statusCode: 500,
            body: 'An internal server error occured while sending SES email.',
        };
    }


    const response = {
        statusCode: 200,
        body: JSON.stringify(
            {
                id: body.id
            }
        ),
    };
    return response;
};