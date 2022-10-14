import Strings from "./Strings";

export default class Contact {

    constructor(payload) {
        this.preferred_method = payload?.preferred_method;
        this.name = payload?.name;
        this.email = payload?.email;
        this.phone = payload?.phone;
        this.postal = payload?.postal;
        this.employee_id = payload?.employee_id;

    }



}