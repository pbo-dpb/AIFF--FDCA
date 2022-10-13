const publicKey = import.meta.env.VITE_CAPTCHA_PUBLIC_KEY;

export default class Captcha {
    constructor() {
        const captchaContainerId = `captcha_${Math.ceil(Math.random() * 10000)}`;

        window.onloadTurnstileCallback = () => {
            window.turnstile.render(document.querySelector(`#${captchaContainerId}`), {
                sitekey: publicKey,
                callback: function (token) {
                    console.log(`Challenge Success ${token}`);
                },
            });

        };

        let aceScript = document.createElement('div');
        aceScript.setAttribute('id', captchaContainerId);
        document.querySelector("pbotool-aiff-fdca").appendChild(aceScript)

        let captchaScript = document.createElement('script')
        captchaScript.async = true;
        captchaScript.defer = true;
        captchaScript.setAttribute('src', 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback');
        document.head.appendChild(captchaScript)
    }

}