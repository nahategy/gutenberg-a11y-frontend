import get_language_file from "./language.service";
import RulesService from "./rules.service";
import RuleButton from "../view/RuleButton";

class HelperService {
    static language;

    static docReady(fn) {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    static initializeAccessibilityChecker() {
        HelperService.language = get_language_file()
        window.addEventListener('unload', HelperService.beforeUnload)
        RuleButton.GetInstance();
    }

    static beforeUnload() {
        const buttons = document.querySelectorAll('.rule-button_container');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.remove();
        }
    }


    static async waitFor(selector, cb) {
        return setTimeout(async () => {
            if (document.querySelector(selector) == null)
                return await this.waitFor(selector, cb);
            cb();
        }, 500);
    }


    static number = 0;

    static getNexNumber() {
        return HelperService.number++;
    }

    static log(msg) {
        console.log(msg)
    }

}


export default HelperService;
