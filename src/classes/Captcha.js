const publicKey = import.meta.env.VITE_CAPTCHA_PUBLIC_KEY;

export default class Captcha {
  constructor() {

    if (window.hasInitializedTurnstile) {
      return;
    }

    this.token = null;

    this.captchaContainerId = `captcha_${Math.ceil(Math.random() * 10000)}`;

    window.onloadTurnstileCallback = () => {
      window.turnstile.render(
        document.querySelector(`#${this.captchaContainerId}`),
        {
          language: document.documentElement.lang || "en",
          sitekey: publicKey,
          callback: (token) => {
            this.token = token;

            setTimeout(() => {
              this.refreshToken();
            }, 29700);
          },
        }
      );
    };

    let aceScript = document.createElement("div");
    aceScript.setAttribute("id", this.captchaContainerId);
    document.querySelector("pbotool-aiff-fdca").innerHTML = "";
    document.querySelector("pbotool-aiff-fdca").appendChild(aceScript);

    let captchaScript = document.createElement("script");
    captchaScript.async = true;
    captchaScript.defer = true;
    captchaScript.setAttribute(
      "src",
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
    );
    document.head.appendChild(captchaScript);

    window.hasInitializedTurnstile = true;
  }

  refreshToken() {
    turnstile.reset(document.querySelector(`#${this.captchaContainerId}`));
  }
}
