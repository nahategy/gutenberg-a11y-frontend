import HelperService from "../services/helper.service";
import RulesService from "../services/rules.service";
import RuleButton from "../view/RuleButton";

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
        if (!result)
            return;

        let failed_rules = window.accessibility_errors.get(this.html_element);
        if (!failed_rules)
            failed_rules = new Map();
        failed_rules.set(this.className, this);
        window.accessibility_errors.set(this.html_element, failed_rules);

        console.log(this);
        if (this.html_element && this.html_element.toString() != '') {
            new RuleButton(this.html_element, failed_rules);
        }

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
