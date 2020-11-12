import HelperService from "../services/helper.service";

class ARule {
    html_element;
    error;
    error_description;

    constructor(html_element) {
        if (new.target === ARule)
            throw new TypeError("Cannot construct Abstract Rule directly")
        this.html_element = html_element;
    }

    run() {
        throw new Error("Run method not Implemented yet!")
    }

    get error() {
        return this.error;
    };

    get error_description() {
        return HelperService.language.get_translation(this.error_description)
    };

}


