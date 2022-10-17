const endpointUrl = import.meta.env.VITE_CAPTCHA_SITE_KEY;
import Captcha from "./Captcha.js"
import Contact from "./Contact.js";

export default class AccessibilityRequest {

    constructor(payload) {
        this.captcha = new Captcha();
        this.id = payload?.id;
        this.request_type = payload?.request_type;
        this.main = payload?.main ?? "";
        this.contact = new Contact(payload?.contact);
    }

    get canRequestAnonymity() {
        return !['alt_document_request'].includes(this.request_type)
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
        if (!this.canRequestAnonymity)
            this.anonymous = false;
    }


    serialize() {
        return JSON.stringify(this)
    }

}