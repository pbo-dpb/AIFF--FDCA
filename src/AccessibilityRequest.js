const endpointUrl = import.meta.env.VITE_CAPTCHA_SITE_KEY;
import Captcha from "./Captcha.js"
import Contact from "./Contact.js";

export default class AccessibilityRequest {

    constructor(payload) {
        //this.captcha = new Captcha();
        this.id = payload?.id;
        this.contact = new Contact(payload?.contact);
    }



}