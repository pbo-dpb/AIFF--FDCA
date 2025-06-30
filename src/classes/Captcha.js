const publicKey = import.meta.env.VITE_CAPTCHA_PUBLIC_KEY;

export default class Captcha {
  constructor(capid) {

    this.token = null;
    this.capid = capid || null;

    this.captchaContainerId = capid || "turnstile-captcha-container";

    if (!window.aiff_turnstile_tokens) {
      window.aiff_turnstile_tokens = {};
    }

    window.onloadTurnstileCallback = () => {
      window.turnstile.render(
        document.querySelector(`#${this.captchaContainerId}`),
        {
          language: document.documentElement.lang || "en",
          appearance: "interaction-only",
          sitekey: publicKey,
          callback: (token) => {
            this.token = token;
            window.aiff_turnstile_tokens[this.capid] = token;

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

  }

  refreshToken() {
    turnstile.reset(document.querySelector(`#${this.captchaContainerId}`));
  }
}
