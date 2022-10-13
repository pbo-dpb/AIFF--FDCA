const publicKey = import.meta.env.VITE_CAPTCHA_PUBLIC_KEY;

export default class Captcha {
    constructor() {

        this.token = null;

        const captchaContainerId = `captcha_${Math.ceil(Math.random() * 10000)}`;

        window.onloadTurnstileCallback = () => {
            window.turnstile.render(document.querySelector(`#${captchaContainerId}`), {
                sitekey: publicKey,
                callback: (token) => {
                    this.token = token;

                    setTimeout(() => {
                        turnstile.reset(document.querySelector(`#${captchaContainerId}`));
                    }, 29700);
                }
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