import HelperService from "../services/helper.service";
import RulesService from "../services/rules.service";

class ARule {
    html_element;
    error;
    error_description;

    constructor(html_element) {
        if (new.target === ARule)
            throw new TypeError("Cannot construct Abstract Rule directly")
        this.html_element = html_element;
    }

    listen() {
        const config = {childList: true};
        const observer = new MutationObserver(this._run.bind(this));
        observer.observe(this.html_element, config);
        this.html_element.oninput = this._run.bind(this);
    }

    _run() {
        const result = this.run();
        console.log(result);
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

    get wcag_link() {
        throw new Error("wcag_link Method not Implemented yet!")
    }

}


export default ARule;
