const endpointUrl = import.meta.env.VITE_SUBMIT_ENDPOINT;
import Captcha from "./Captcha.js";
import Contact from "./Contact.js";

export default class AccessibilityRequest {
  constructor(payload) {
    this.captcha = new Captcha(`captcha_${Math.ceil(Math.random() * 10000)}`);
    this.id = payload?.id;
    this.request_type = payload?.request_type;
    this.main = payload?.main ?? "";
    this.contact = new Contact(payload?.contact);
    this.language = payload?.language ?? document.documentElement.lang;
  }

  get canRequestAnonymity() {
    return !["alt_document_request", "general_question"].includes(
      this.request_type
    );
  }

  get anonymous() {
    return !this.contact;
  }

  set anonymous(a) {
    /**
     * We must clear the contact object to avoid submitting it if the user
     * has taken positive steps to submit an anonymous request. We
     * also don't want to replace the contact object if it exists
     * so users can update the request type without losing
     * their already filled form data.
     */

    if (a) {
      this.contact = null;
    } else if (!this.contact) {
      this.contact = new Contact();
    }
  }

  get requestType() {
    return this.request_type;
  }

  set requestType(rt) {
    this.request_type = rt;
    if (!this.canRequestAnonymity) this.anonymous = false;
  }

  serialize() {

    if (!this.captcha.token) {
      serializedForm.captcha.token = window.aiff_turnstile_tokens?.[this.captcha.capid] || null;
    }

    const structuredForm = JSON.parse(JSON.stringify(this));

    if (true || !structuredForm?.captcha?.token) {
      structuredForm.captcha.token = window.aiff_turnstile_tokens?.[this.captcha.capid] || null;
    }

    return JSON.stringify(structuredForm);
  }

  async submit() {
    let serializedForm = this.serialize();


    const rawResponse = await fetch(endpointUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: serializedForm,
    });

    if (rawResponse.status === 422) {
      throw await rawResponse.json();
    } else if (rawResponse.status !== 200) {
      throw await rawResponse.text();
    }

    const content = await rawResponse.json();

    return (this.id = content.id);
  }
}
